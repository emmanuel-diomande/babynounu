import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../rooms/rooms.service';
import { AuthService } from '../auth/auth.service';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-auth.guard';
import { MessageService } from '../messages/messages.service';
import { AbonnementService } from '../abonnement/abonnement.service';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Ou votre domaine frontend
    credentials: true,
  },
  pingTimeout: 30000, // Réduire à 30s
  pingInterval: 10000, // Réduire à 10s
  transports: ['websocket']
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers: Map<string, Socket> = new Map();
  private readonly connectionLock = new Map<string, Promise<void>>();

  constructor(
    private readonly roomService: RoomsService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly abonnementService: AbonnementService,
    private readonly notificationService: NotificationService,
  ) {}

  afterInit(server: Server) {
    server.sockets.setMaxListeners(50); // Réduire à 50
  }

  async handleConnection(client: Socket) {
    try {
      const userId = await this.authService.getUserFromSocket(client);
      if (!userId) {
        client.disconnect(true);
        return;
      }
  
      if (!this.connectionLock.has(userId.id)) {
        const connectionPromise = (async () => {
          try {
            await this.handleNewConnection(userId.id, client);
          } catch (error) {
            client.disconnect(true);
          } finally {
            this.connectionLock.delete(userId.id);
          }
        })();
  
        this.connectionLock.set(userId.id, connectionPromise);
      }
  
      await this.connectionLock.get(userId.id);
    } catch (error) {
      client.disconnect(true);
    }
  }

  // Créer une structure pour stocker plusieurs connexions par utilisateur
  private userConnections: Map<string, Set<Socket>> = new Map();

  private async handleNewConnection(userId: string, client: Socket) {
    // Ajouter cette connexion aux connexions de l'utilisateur
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Set());
    }
    this.userConnections.get(userId).add(client);
    
    // Conserver également la connexion la plus récente pour la compatibilité
    this.connectedUsers.set(userId, client);
    
    client.join(`user_${userId}`);
    
    // Configurer le handler de déconnexion
    const disconnectHandler = () => {
      // Supprimer uniquement cette connexion spécifique
      if (this.userConnections.has(userId)) {
        this.userConnections.get(userId).delete(client);
        if (this.userConnections.get(userId).size === 0) {
          this.userConnections.delete(userId);
        }
      }
      
      // Si c'était la connexion principale, mettre à jour
      if (this.connectedUsers.get(userId)?.id === client.id) {
        const remainingConnections = this.userConnections.get(userId);
        if (remainingConnections && remainingConnections.size > 0) {
          // Prendre la première connexion restante comme principale
          this.connectedUsers.set(userId, Array.from(remainingConnections)[0]);
        } else {
          this.connectedUsers.delete(userId);
        }
      }
    };
    
    client.on('disconnect', disconnectHandler);
    client.data.disconnectHandler = disconnectHandler;
  }

  private cleanupSocket(socket: Socket) {
    if (socket.data?.disconnectHandler) {
      socket.off('disconnect', socket.data.disconnectHandler);
    }
    // Nettoyer les autres écouteurs d'événements
    this.removeAllListeners(socket);
    
    // Informer le client qu'il a été remplacé par une nouvelle connexion
    socket.emit('connectionReplaced', {
      message: 'Votre session a été remplacée par une nouvelle connexion'
    });
    
    // Déconnecter en douceur (sans forcer)
    socket.disconnect(false);
  }

  private removeAllListeners(socket: Socket) {
    if (socket.data?.listeners) {
      Object.entries(socket.data.listeners).forEach(([event, handler]) => {
        socket.off(event, handler as (...args: any[]) => void);
      });
      delete socket.data.listeners;
    }
  }

  private handleUserDisconnect(userId: string, socketId: string) {
    const currentSocket = this.connectedUsers.get(userId);
    if (currentSocket?.id === socketId) {
      this.removeAllListeners(currentSocket);
      this.connectedUsers.delete(userId);
      // this.logger.log(`User ${userId} disconnected (Socket ${socketId})`);
    }
  }

  handleDisconnect(client: Socket) {
      this.removeAllListeners(client);
      if (client.data?.disconnectHandler) {
          client.off('disconnect', client.data.disconnectHandler);
      }
  }

  @SubscribeMessage('joinRoom')
  @UseGuards(WsJwtGuard)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);

      if (!user) {
        throw new WsException('Unauthorized');
      }

      const room = await this.roomService.getRoom(roomId);
      if (!room) {
        throw new WsException('Rooms not found');
      }

      // Verify user is part of this room
      if (room.sender.id !== user.id && room.receiver.id !== user.id) {
        throw new WsException('Not a member of this room');
      }

      client.join(`room_${roomId}`);
      // this.logger.log(`User ${user.id} joined room ${roomId}`);

      return { success: true, roomId };
    } catch (error) {
      // this.logger.error(`JoinRoom error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('leaveRoom')
  @UseGuards(WsJwtGuard)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    client.leave(`room_${roomId}`);
    return { success: true };
  }

  @SubscribeMessage('sendMessage')
  @UseGuards(WsJwtGuard)
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: number;
      content: string;
      isProposition?: boolean;
      type?: 'Message' | 'Proposition';
      propositionExpired?: string;
    },
  ) {
    try {
      const sender = await this.authService.getUserFromSocket(client);
      if (!sender) {
        throw new WsException('Unauthorized');
      }

      const room = await this.roomService.getRoom(data.roomId);
      if (!room) {
        throw new WsException('Rooms not found');
      }

      // Verify user is part of this room
      if (room.sender.id !== sender.id && room.receiver.id !== sender.id) {
        throw new WsException('Not a member of this room');
      }

      const receiverId =
        room.sender.id === sender.id ? room.receiver.id : room.sender.id;
      const isReceiverOnline = this.isUserOnline(receiverId);
      const newMessage = await this.messageService.create({
        content: data.content,
        roomId: data.roomId,
        senderId: sender.id,
        isRead: false,
        isProposition: data.isProposition ? true : false,
        type: data.type,
        propositionExpired: data.propositionExpired,
      });

      // Emit to room members
      this.server.to(`room_${data.roomId}`).emit('newMessage', newMessage);

      // Update conversation lists
      this.updateConversationList(sender.id);
      this.updateConversationList(receiverId);

      // Handle notifications if receiver is offline
      // if (!isReceiverOnline) {
      await this.notifyNewMessage(data.roomId, sender.id);
      // }

      return { success: true, message: newMessage };
    } catch (error) {
      // this.logger.error(`SendMessage error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  private async updateConversationList(userId: string) {
    try {
      const conversations = await this.roomService.getUserConversations(userId);
      this.server
        .to(`user_${userId}`)
        .emit('conversationsUpdated', conversations);
    } catch (error) {
      // this.logger.error(
      //   `UpdateConversationList error for user ${userId}: ${error.message}`,
      // );
    }
  }

  @SubscribeMessage('conversationsUpdated')
  @UseGuards(WsJwtGuard)
  async handleSeenMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      this.updateConversationList(user.id);
    }
  }

  @SubscribeMessage('typingStart')
  @UseGuards(WsJwtGuard)
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number; isTyping: boolean },
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      client.to(`room_${data.roomId}`).emit('userTyping', {
        userId: user.id,
        isTyping: data.isTyping,
      });
    }
  }

  @SubscribeMessage('typingStop')
  @UseGuards(WsJwtGuard)
  async handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number },
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      client.to(`room_${data.roomId}`).emit('userStoppedTyping', {
        userId: user.id,
      });
    }
  }

  @SubscribeMessage('markAsRead')
  @UseGuards(WsJwtGuard)
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number,
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user) {
      // this.updateConversationList(user.id);
      const result = await this.roomService.resetUnreadCount(roomId, user.id);
      const totalUnread = await this.roomService.getTotalUnreadCount(user.id);

      this.server.to(`user_${user.id}`).emit('unreadUpdated', {
        roomId,
        count: result.count,
        totalUnread,
      });

      return { success: true };
    }
    return { success: false };
  }

  @SubscribeMessage('getUnreadCounts')
  @UseGuards(WsJwtGuard)
  async getTotalUnreadCount(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    const user = await this.authService.getUserFromSocket(client);
    if (user && user.id === userId) {
      this.server.to(`user_${user.id}`).emit('unreadCounts', {
        totalUnread: await this.roomService.getTotalUnreadCount(userId),
      });
    }
  }

  async notifyNewMessage(roomId: number, senderId: string) {
    try {
      const room = await this.roomService.getRoom(roomId);
      if (!room) return;

      const receiverId =
        room.sender.id === senderId ? room.receiver.id : room.sender.id;
      const unreadCount = await this.roomService.incrementUnreadCount(
        roomId,
        receiverId,
      );
      const totalUnread =
        await this.roomService.getTotalUnreadCount(receiverId);

      this.server.to(`user_${receiverId}`).emit('unreadUpdated', {
        roomId,
        unreadCount,
        totalUnread,
      });
    } catch (error) {
      // this.logger.error(`NotifyNewMessage error: ${error.message}`);
    }
  }

  //#region Notification

  @SubscribeMessage('getNotifications')
  @UseGuards(WsJwtGuard)
  async GetNotifications(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const notifications = await this.notificationService.getNotifications(
        data.userId,
      );
      this.server.to(`user_${user.id}`).emit('notifications', notifications);
    } catch (error) {
      // this.logger.error(`GetNotifications error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('markAsReadNotification')
  @UseGuards(WsJwtGuard)
  async markAsReadNotification(
    @MessageBody() data: { notificationId: number; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      await this.notificationService.markAsRead(data.notificationId);
      client.emit('notificationMarkedAsRead', {
        userId: data.userId,
        success: true,
      });
    } catch (error) {
      // this.logger.error(`MarkAsReadNotification error: ${error.message}`);
      client.emit('notificationMarkedAsRead', {
        userId: data.userId,
        success: false,
      });
    }
  }

  @SubscribeMessage('getUnreadCountsNotification')
  @UseGuards(WsJwtGuard)
  async getUnreadCountsNotification(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user) {
        throw new WsException('Unauthorized');
      }

      const unreadCountsNotification =
        await this.notificationService.getAllCountByReceiverId(data.userId);

      client.emit('unreadCountsNotification', unreadCountsNotification);
    } catch (error) {
      // this.logger.error(`GetUnreadCountsNotification error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  //#endregion Notification

  @SubscribeMessage('checkIsAbonnement')
  @UseGuards(WsJwtGuard)
  async IsAbonnement(
    @MessageBody() data: { userId: string; transactionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      const hasActiveAbonnement =
        await this.abonnementService.createAbonnement(data);

      this.server
        .to(`user_${user.id}`)
        .emit('isAbonnement', hasActiveAbonnement);
    } catch (error) {
      // this.logger.error(`IsAbonnement error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('checkPaymentPoint')
  @UseGuards(WsJwtGuard)
  async checkPaymentPoint(
    @MessageBody()
    data: { userId: string; transactionId: string; points: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const user = await this.authService.getUserFromSocket(client);
      if (!user || user.id !== data.userId) {
        throw new WsException('Unauthorized');
      }

      const hasActiveAbonnement =
        await this.abonnementService.createPaymentPoint(data);

      this.server
        .to(`user_${user.id}`)
        .emit('checkPaymentPoint', hasActiveAbonnement);
    } catch (error) {
      // this.logger.error(`checkPaymentPoint error: ${error.message}`);
      throw new WsException(error.message);
    }
  }

  // Utility methods
  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  getUserSocket(userId: string): Socket | undefined {
    return this.connectedUsers.get(userId);
  }
}

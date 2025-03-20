"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const create_chat_dto_1 = require("./dto/create-chat.dto");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(sendMessageDto) {
        return this.chatService.saveMessage({
            senderId: sendMessageDto.senderId,
            roomId: sendMessageDto.roomId,
            content: sendMessageDto.content,
        });
    }
    async createConversation(createConversationDto) {
        return this.chatService.createConversation(createConversationDto);
    }
    async getConversation(room, openChatSenderId) {
        return this.chatService.getConversation(room, openChatSenderId);
    }
    async getConversationsByUser(userId) {
        return this.chatService.getAllConversationsByUser(userId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: 'Envoyer un message' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message envoyé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatMessageDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('conversations/create'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une conversation' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Conversation créée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_dto_1.CreateConversationDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)('conversations/:conversationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir une conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conversation retournée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conversation non trouvée' }),
    __param(0, (0, common_1.Param)('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Get)('conversations/user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les conversations par utilisateur' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des conversations par utilisateur retournée',
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversationsByUser", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chat'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);

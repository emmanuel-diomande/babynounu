import { Rooms } from './rooms.model';
import { User } from 'src/app/user/user.model';
export declare class Message {
    id: number;
    sender: User;
    content: string;
    room: Rooms;
    viewed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

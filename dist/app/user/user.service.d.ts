import { Repository } from 'typeorm';
import { User } from './user.model';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    user(userWhereUniqueInput: any): Promise<User | null>;
    users(): Promise<User[]>;
    createUser(data: {
        fullname: string;
        email: string;
    }): Promise<User>;
    updateUser(data: {
        fullname: string;
        email: string;
    }): Promise<User>;
    deleteUser(where: any): Promise<{
        message: string;
    }>;
    loggedUser(): {
        message: string;
        status: boolean;
    };
}

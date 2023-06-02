import { Injectable } from '@nestjs/common';
import { UserRepository } from '../core/repositories';
import { User } from './entities';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOneById(id);
    }
}

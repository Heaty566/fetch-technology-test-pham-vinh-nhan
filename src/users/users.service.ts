import { Injectable } from '@nestjs/common';
import { UserRepository } from '../core/repositories';
import { RegisterUserV1Dto } from './dto';
import { ServerHttpException } from 'src/core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import { User, UserRoleNameEnum } from './entities';
import { AuthService } from './auth.service';
import { UserRoleService } from './userRole.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService,
        private readonly userRoleService: UserRoleService,
    ) {}

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOneById(id);
    }
}

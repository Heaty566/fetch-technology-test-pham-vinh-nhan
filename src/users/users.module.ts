import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository, UserRoleRepository } from '../core/repositories';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserRole } from './entities';
import { UserRoleService } from './userRole.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { config } from '../core/common/config';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRole])],

    controllers: [UsersController, AuthController],
    providers: [
        UsersService,
        AuthService,
        UserRoleService,
        UserRoleRepository,
        UserRepository,
        {
            provide: JwtService,
            useFactory: () => {
                return new JwtService({ secret: config.JWT_SECRET_KEY });
            },
        },
    ],
    exports: [UsersService, AuthService, UserRoleService],
})
export class UsersModule {}

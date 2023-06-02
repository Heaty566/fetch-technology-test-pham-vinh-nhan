import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as _ from 'lodash';
import { AuthService } from '../../users/auth.service';
import { UserRoleNameEnum } from '../../users/entities';
import { UsersService } from '../../users/users.service';
import { constant } from '../common/constant';
import { ServerHttpException } from '../interfaces/class';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // get token from header
        const req: Request = context.switchToHttp().getRequest();
        const roles =
            this.reflector.get<UserRoleNameEnum[]>(
                'roles',
                context.getHandler(),
            ) || [];

        const authorization = _.get(
            req.headers,
            `${constant.CLIENT.HEADER_AUTH_KEY}`,
            '',
        );
        const token = _.get((authorization as string).split(' '), `[1]`, '');

        // verify token
        const { data, error } = await this.authService.verifyToken(token);
        if (error) {
            throw new ServerHttpException(
                'Token is invalid',
                StatusCodes.UNAUTHORIZED,
            );
        }

        // get user by id
        const userId = _.get(data, 'userId', '');
        const user = await this.usersService.getUserById(userId);

        if (!user) {
            throw new ServerHttpException(
                'Token is invalid',
                StatusCodes.UNAUTHORIZED,
            );
        }

        // checking user role
        if (roles.length && !roles.includes(user.role.name)) {
            throw new ServerHttpException(
                'Token is invalid',
                StatusCodes.FORBIDDEN,
            );
        }

        user.password = '';
        req.user = user;

        return true;
    }
}

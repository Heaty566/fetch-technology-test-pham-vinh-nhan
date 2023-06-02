import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { constant } from '../core/common/constant';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserV1Dto } from './dto';
import { UserRepository } from '../core/repositories';
import { ServerHttpException } from 'src/core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import { User, UserRoleNameEnum } from './entities';
import { UserRoleService } from './userRole.service';
import { monoLogger } from 'mono-utils-core';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly userRoleService: UserRoleService,
    ) {}

    private async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, constant.APP.DEFAULT_HASH_SALT);
    }

    private async decryptPassword(
        inputPassword: string,
        comparePassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(inputPassword, comparePassword);
    }

    private async encryptAccessToken(
        tokenData: Record<any, any>,
        maxAge: number,
    ) {
        try {
            const token = await this.jwtService.signAsync(
                {
                    userId: tokenData.id,
                },
                {
                    expiresIn: maxAge,
                },
            );

            return token;
        } catch (err) {
            monoLogger.log(constant.LOGGER.NS.APP_ERROR, err);
            return null;
        }
    }

    private async _createUser(body: RegisterUserV1Dto) {
        const user = new User();
        user.email = body.email;
        user.name = body.name;
        user.password = await this.encryptPassword(body.password);
        user.role = await this.userRoleService.getUserRoleByName(
            UserRoleNameEnum.CUSTOMER,
        );
        return await this.userRepository.save(user);
    }

    async registerUserV1(body: RegisterUserV1Dto) {
        const existedUser = await this.userRepository.findOne({
            where: { email: body.email },
        });

        if (existedUser) {
            throw new ServerHttpException(
                'Email is already existed',
                StatusCodes.BAD_REQUEST,
            );
        }

        const newUser = await this._createUser(body);

        const accessToken = await this.encryptAccessToken(
            newUser,
            constant.APP.DEFAULT_TOKEN_AGING,
        );

        return {
            accessToken,
        };
    }
}

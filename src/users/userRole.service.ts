import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRoleRepository } from '../core/repositories';
import { UserRole, UserRoleNameEnum } from './entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRoleService implements OnModuleInit {
    constructor(private readonly userRoleRepository: UserRoleRepository) {}
    private readonly userRoleNames = [
        UserRoleNameEnum.ADMIN,
        UserRoleNameEnum.CUSTOMER,
    ];

    private _createRole = async (name: UserRoleNameEnum) => {
        const userRole = new UserRole();
        userRole.name = name;
        return await this.userRoleRepository.save(userRole);
    };

    private async _createDefaultUserRoles() {
        this.userRoleNames.forEach(async (userRoleName) => {
            const userRole = await this.userRoleRepository.findOne({
                where: { name: userRoleName },
            });
            if (!userRole) {
                await this._createRole(userRoleName);
            }
        });
    }

    async onModuleInit() {
        await this._createDefaultUserRoles();
    }

    async getUserRoleByName(name: UserRoleNameEnum) {
        return await this.userRoleRepository.findOne({
            where: { name },
        });
    }
}

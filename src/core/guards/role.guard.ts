import { SetMetadata } from '@nestjs/common';
import { UserRoleNameEnum } from '../../users/entities';

export const RoleGuard = (roles: UserRoleNameEnum[]) =>
    SetMetadata('roles', roles);

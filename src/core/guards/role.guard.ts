import { SetMetadata } from '@nestjs/common';
import { UserRoleNameEnum } from 'src/users/entities';

export const RoleGuard = (role: UserRoleNameEnum) => SetMetadata('role', role);

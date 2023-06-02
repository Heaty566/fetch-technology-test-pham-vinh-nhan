import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRole } from '../../users/entities';
import { RepositoryService } from './repository.class';

@Injectable()
export class UserRoleRepository extends RepositoryService<UserRole> {
    constructor(dataSource: DataSource) {
        super(UserRole, dataSource.createEntityManager());
    }
}

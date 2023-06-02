import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities';
import { RepositoryService } from './repository.class';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends RepositoryService<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}

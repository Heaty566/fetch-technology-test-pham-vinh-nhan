import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum UserRoleNameEnum {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: UserRoleNameEnum;

    @CreateDateColumn({})
    createdAt: number;

    @UpdateDateColumn({})
    updatedAt: number;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}

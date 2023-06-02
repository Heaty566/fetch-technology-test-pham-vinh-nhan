import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './userRole.entity';

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @CreateDateColumn({})
    createdAt: number;

    @UpdateDateColumn({})
    updatedAt: number;

    @ManyToOne(() => UserRole, (userRole) => userRole.users)
    role: UserRole;
}

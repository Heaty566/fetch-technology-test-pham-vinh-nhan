import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './userRole.entity';
import { RoomBooking } from '../../rooms/entities';

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '' })
    name: string;

    @Column({ default: '' })
    email: string;

    @Column({ default: '' })
    phone: string;

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

    @OneToMany(() => RoomBooking, (roomBooking) => roomBooking.user)
    roomBookings: RoomBooking[];
}

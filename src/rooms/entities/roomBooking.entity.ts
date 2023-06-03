import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { RoomBookingItem } from './roomBookingItem.entity';
import { User } from '../../users/entities';

export enum BookingStatusEnum {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
}

@Entity()
export class RoomBooking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: BookingStatusEnum.ACTIVE })
    status: BookingStatusEnum;

    @Column({
        default: '',
    })
    name: string;

    @Column({
        default: '',
    })
    phone: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @CreateDateColumn({})
    createdAt: number;

    @UpdateDateColumn({})
    updatedAt: number;

    @OneToMany(
        () => RoomBookingItem,
        (roomBookingItem) => roomBookingItem.roomBooking,
    )
    bookingItems: RoomBookingItem[];

    @ManyToOne(() => User, (user) => user.roomBookings, {
        nullable: true,
    })
    user: User;
}

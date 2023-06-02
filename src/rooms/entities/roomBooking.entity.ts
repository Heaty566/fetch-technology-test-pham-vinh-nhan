import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { RoomBookingItem } from './roomBookingItem.entity';

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
}

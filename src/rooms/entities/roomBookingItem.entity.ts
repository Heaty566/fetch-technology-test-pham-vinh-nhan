import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { RoomBooking } from './roomBooking.entity';

@Entity()
export class RoomBookingItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 0 })
    quantity: number;

    @Column({ default: 0, type: 'numeric' })
    price: number;

    @CreateDateColumn({})
    createdAt: number;

    @UpdateDateColumn({})
    updatedAt: number;

    @ManyToOne(() => Room, (room) => room.bookingItems)
    room: Room;

    @ManyToOne(() => RoomBooking, (room) => room.bookingItems)
    roomBooking: RoomBooking;
}

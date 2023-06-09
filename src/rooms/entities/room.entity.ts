import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { RoomBookingItem } from './roomBookingItem.entity';

export enum RoomStatusEnum {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
}

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 0 })
    quantity: number;

    @Column({ default: '' })
    imageUrl: string;

    @Column({ default: 0, type: 'numeric' })
    price: number;

    @Column({ default: RoomStatusEnum.ACTIVE })
    status: RoomStatusEnum;

    @Column({})
    type: string;

    @CreateDateColumn({})
    createdAt: number;

    @UpdateDateColumn({})
    updatedAt: number;

    @OneToMany(() => RoomBookingItem, (roomBookingItem) => roomBookingItem.room)
    bookingItems: RoomBookingItem[];
}

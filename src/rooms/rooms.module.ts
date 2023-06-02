import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { AdminRoomsController } from './adminRooms.controller';
import { AdminRoomsService } from './adminRooms.service';
import {
    RoomBookingItemRepository,
    RoomBookingRepository,
    RoomRepository,
} from '../core/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities';
import { UsersModule } from 'src/users/users.module';
import { RoomBookingService } from './roomBooking.service';
import { RoomBookingController } from './roomBooking.controller';
import { AdminRoomBookingController } from './adminRoomBooking.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Room]), UsersModule],
    controllers: [
        RoomsController,
        AdminRoomsController,
        RoomBookingController,
        AdminRoomBookingController,
    ],
    providers: [
        RoomsService,
        AdminRoomsService,
        RoomRepository,
        RoomBookingRepository,
        RoomBookingService,
        RoomBookingItemRepository,
    ],
})
export class RoomsModule {}

import { Injectable } from '@nestjs/common';
import { RoomBookingRepository, RoomRepository } from '../core/repositories';
import { ServerHttpException } from '../core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import { RoomBooking, RoomStatusEnum } from './entities';
import { QueryAvailableRoomByDateV1Dto } from './dto/filterAvaibleRoom.dto';
import {
    BookingRoomItem,
    BookingRoomMeV1Dto,
    BookingRoomV1Dto,
} from './dto/bookingRoom.dto';
import { RoomBookingService } from './roomBooking.service';
import { UsersService } from '../users/users.service';
import { UpdateBookingRoomMeV1Dto } from './dto/updateBookingRoom.dto';

@Injectable()
export class UserRoomBookingService {
    constructor(
        private readonly roomBookingRepository: RoomBookingRepository,
        private readonly roomRepository: RoomRepository,
        private readonly roomBookingSerive: RoomBookingService,
        private readonly userService: UsersService,
    ) {}

    async isAvailableRoomByRangeDateExcludeRoomBookingV1(
        startDate: Date,
        endDate: Date,
        bookingRoomId: string,
        bookingRoomItems: BookingRoomItem[],
    ) {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        const bookedRooms = await Promise.all(
            bookingRoomItems.map(async (room) => {
                const maxQuantity =
                    await this.roomBookingRepository.getMaxAvailableInDateRangeExclueBookingRoomV1(
                        room.roomId,
                        bookingRoomId,
                        startDate,
                        endDate,
                    );

                return maxQuantity >= room.quantity;
            }),
        );

        const filteredRooms = bookingRoomItems.filter(
            (_, index) => bookedRooms[index],
        );

        if (filteredRooms.length !== bookingRoomItems.length) {
            throw new ServerHttpException(
                'Room is not available',
                StatusCodes.BAD_REQUEST,
            );
        }

        return bookedRooms;
    }

    async roomBookingMeV1(userId: string, input: BookingRoomMeV1Dto) {
        const user = await this.userService.getUserById(userId);
        await this.roomBookingSerive.isAvailableRoomByRangeDateV1(
            input.startDate,
            input.endDate,
            input.rooms,
        );

        const roomBooking = new RoomBooking();
        roomBooking.startDate = input.startDate;
        roomBooking.endDate = input.endDate;
        roomBooking.name = user.name;
        roomBooking.phone = user.phone;
        roomBooking.bookingItems = await Promise.all(
            input.rooms.map(async (room) => {
                const roomBookingItem =
                    await this.roomBookingSerive.createRoomBookingItem(
                        room.roomId,
                        room.quantity,
                    );

                return roomBookingItem;
            }),
        );
        roomBooking.user = user;

        return await this.roomBookingRepository.save(roomBooking);
    }

    async updateRoomBookingMeV1(
        userId: string,
        bookingRoomId: string,
        input: UpdateBookingRoomMeV1Dto,
    ) {
        const user = await this.userService.getUserById(userId);
        await this.isAvailableRoomByRangeDateExcludeRoomBookingV1(
            input.startDate,
            input.endDate,
            bookingRoomId,
            input.rooms,
        );

        const roomBooking =
            await this.roomBookingRepository.findBookingRoomByIdV1(
                bookingRoomId,
            );

        roomBooking.startDate = input.startDate;
        roomBooking.endDate = input.endDate;
        roomBooking.name = input.name;
        roomBooking.phone = input.phone;
        roomBooking.bookingItems = await Promise.all(
            input.rooms.map(async (room) => {
                const roomBookingItem =
                    await this.roomBookingSerive.createRoomBookingItem(
                        room.roomId,
                        room.quantity,
                    );

                return roomBookingItem;
            }),
        );
        roomBooking.user = user;

        return await this.roomBookingRepository.save(roomBooking);
    }
}

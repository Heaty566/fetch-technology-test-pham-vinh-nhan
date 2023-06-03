import { Injectable } from '@nestjs/common';
import {
    RoomBookingItemRepository,
    RoomBookingRepository,
    RoomRepository,
} from '../core/repositories';
import { ServerHttpException } from '../core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import {
    BookingStatusEnum,
    RoomBooking,
    RoomBookingItem,
    RoomStatusEnum,
} from './entities';
import {
    QueryAvailableRoomByDateV1Dto,
    QueryAvailableRoomByRangeDateV1Dto,
} from './dto';
import { BookingRoomItem, BookingRoomV1Dto } from './dto/bookingRoom.dto';

@Injectable()
export class RoomBookingService {
    constructor(
        private readonly roomBookingRepository: RoomBookingRepository,
        private readonly roomBookingItemRepository: RoomBookingItemRepository,
        private readonly roomRepository: RoomRepository,
    ) {}

    async findAvailableRoomByDateV1(filters: QueryAvailableRoomByDateV1Dto) {
        const bookedRooms =
            await this.roomBookingRepository.findAllBookingRoomByDateV1(
                filters.date,
                filters.date,
            );

        const bookedRoomItems =
            bookedRooms.map((item) => item.bookingItems).flat() || [];

        const rooms = await this.roomRepository.find();

        const remainBookedByRoom = rooms.map((room) => {
            const totalBookedQuantity = bookedRoomItems
                .filter((bookedRoom) => bookedRoom.room.id === room.id)
                .reduce((total, bookedRoom) => {
                    return total + bookedRoom.quantity;
                }, 0);

            room.quantity = room.quantity - totalBookedQuantity;

            return room;
        });

        return remainBookedByRoom.filter((room) => room.quantity > 0);
    }

    async findAvailableRoomByRangeDateV1(
        filters: QueryAvailableRoomByRangeDateV1Dto,
    ) {
        const bookedRooms =
            await this.roomBookingRepository.findAllBookingRoomByDateV1(
                filters.startDate,
                filters.endDate,
            );

        const bookedRoomItems =
            bookedRooms.map((item) => item.bookingItems).flat() || [];

        const rooms = await this.roomRepository.find();

        const remainBookedByRoom = rooms.map((room) => {
            const totalBookedQuantity = bookedRoomItems
                .filter((bookedRoom) => bookedRoom.room.id === room.id)
                .reduce((total, bookedRoom) => {
                    return total + bookedRoom.quantity;
                }, 0);

            room.quantity = room.quantity - totalBookedQuantity;

            return room;
        });

        return remainBookedByRoom.filter((room) => room.quantity > 0);
    }

    async isAvailableRoomByRangeDateV1(
        startDate: Date,
        endDate: Date,
        bookingRoomItems: BookingRoomItem[],
    ) {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        const bookedRooms = await Promise.all(
            bookingRoomItems.map(async (room) => {
                const maxQuantity =
                    await this.roomBookingRepository.getMaxAvailableInDateRangeV1(
                        room.roomId,
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

    async createRoomBookingItem(roomId: string, quantity: number) {
        const room = await this.roomRepository.findRoomById(roomId);
        const roomBookingItem = new RoomBookingItem();
        roomBookingItem.quantity = quantity;
        roomBookingItem.price = Number(room.price) * quantity;
        roomBookingItem.room = room;
        roomBookingItem.roomBooking;

        return await this.roomBookingItemRepository.save(roomBookingItem);
    }

    async cancelRoomBookingV1(id: string) {
        const roomBooking =
            await this.roomBookingRepository.findBookingRoomByIdV1(id);

        if (!roomBooking) {
            throw new ServerHttpException(
                'Booking room not found',
                StatusCodes.NOT_FOUND,
            );
        }

        roomBooking.status = BookingStatusEnum.CANCELLED;

        return await this.roomBookingRepository.save(roomBooking);
    }

    async roomBookingV1(input: BookingRoomV1Dto) {
        await this.isAvailableRoomByRangeDateV1(
            input.startDate,
            input.endDate,
            input.rooms,
        );

        const roomBooking = new RoomBooking();
        roomBooking.startDate = input.startDate;
        roomBooking.endDate = input.endDate;
        roomBooking.name = input.name;
        roomBooking.phone = input.phone;
        roomBooking.bookingItems = await Promise.all(
            input.rooms.map(async (room) => {
                const roomBookingItem = await this.createRoomBookingItem(
                    room.roomId,
                    room.quantity,
                );

                return roomBookingItem;
            }),
        );

        return await this.roomBookingRepository.save(roomBooking);
    }
}

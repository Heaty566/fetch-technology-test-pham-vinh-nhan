import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
    BookingStatusEnum,
    Room,
    RoomBooking,
    RoomBookingItem,
    RoomStatusEnum,
} from '../../rooms/entities';
import { queryGenerator } from '../utils/query.utils';
import { RepositoryService } from './repository.class';
import { CompareOperator } from './repository.interface';
import * as _ from 'lodash';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomBookingRepository extends RepositoryService<RoomBooking> {
    constructor(
        private readonly roomRepository: RoomRepository,
        dataSource: DataSource,
    ) {
        super(RoomBooking, dataSource.createEntityManager());
    }

    async findBookingRoomByIdV1(id: string) {
        return this.createQueryBuilder('roomBooking')
            .leftJoinAndSelect('roomBooking.bookingItems', 'bookingItems')
            .leftJoinAndSelect('bookingItems.room', 'room')
            .where('roomBooking.id = :id', { id })
            .andWhere('room.status = :status', {
                status: RoomStatusEnum.ACTIVE,
            })
            .getOne();
    }

    async findAllBookingRoomByDateV1(startDate: Date, endDate: Date) {
        const { tableName } = this.metadata;

        const { filterValues, queryString } = queryGenerator(
            {
                startDate,
                endDate,
                status: BookingStatusEnum.ACTIVE,
            },
            {
                startDate: {
                    tableName,
                    compareKey: 'startDate',
                    operator: CompareOperator.LESS_THAN_OR_EQUAL,
                },
                endDate: {
                    tableName,
                    compareKey: 'endDate',
                    operator: CompareOperator.GREATER_THAN_OR_EQUAL,
                },
                status: {
                    tableName,
                    compareKey: 'status',
                    operator: CompareOperator.EQUAL,
                },
            },
        );

        return await this.createQueryBuilder(tableName)
            .leftJoinAndSelect(`${tableName}.bookingItems`, 'bookingItems')
            .leftJoinAndSelect('bookingItems.room', 'room')
            .where(queryString, filterValues)
            .andWhere('room.status = :status', {
                status: BookingStatusEnum.ACTIVE,
            })
            .getMany();
    }

    async getMaxAvailableInDateRangeV1(
        roomId: string,
        startDate: Date,
        endDate: Date,
    ) {
        const { tableName } = this.metadata;
        const { filterValues, queryString } = queryGenerator(
            {
                startDate,
                endDate,
                status: BookingStatusEnum.ACTIVE,
                roomId,
            },
            {
                startDate: {
                    tableName,
                    compareKey: 'startDate',
                    operator: CompareOperator.GREATER_THAN_OR_EQUAL,
                },
                endDate: {
                    tableName,
                    compareKey: 'endDate',
                    operator: CompareOperator.LESS_THAN_OR_EQUAL,
                },
                status: {
                    tableName,
                    compareKey: 'status',
                    operator: CompareOperator.EQUAL,
                },
                roomId: {
                    tableName: 'room',
                    compareKey: 'id',
                    operator: CompareOperator.EQUAL,
                },
            },
        );

        const bookingRoom = await this.createQueryBuilder(tableName)
            .leftJoinAndSelect(`${tableName}.bookingItems`, 'bookingItems')
            .leftJoinAndSelect('bookingItems.room', 'room')
            .where(queryString, filterValues)
            .andWhere('room.status = :status', {
                status: BookingStatusEnum.ACTIVE,
            })
            .getMany();

        let room: Room;

        const rangeDate = this._generateArrayOfDate(startDate, endDate);
        const value = rangeDate.map((item) => {
            bookingRoom.map((roomItem) => {
                roomItem.bookingItems.map((bookingItem) => {
                    room = roomItem.bookingItems[0].room;
                    if (
                        item.value >= roomItem.startDate &&
                        item.value <= roomItem.endDate
                    ) {
                        item.count += bookingItem.quantity;
                    }
                });
            });

            return item;
        });

        if (!room) {
            room = await this.roomRepository.findOne({
                where: {
                    id: roomId,
                },
            });
        }

        const totalQuantity = _.get(room, 'quantity', 0);

        const totalBooked = value.reduce((total, item) => {
            return item.count > total ? item.count : total;
        }, value[0].count);

        return totalQuantity - totalBooked;
    }

    private _generateArrayOfDate(startDate: Date, endDate: Date) {
        const dateArray: Array<{
            count: number;
            value: Date;
        }> = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dateArray.push({
                value: new Date(currentDate),
                count: 0,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    }
}

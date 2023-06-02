import { Injectable } from '@nestjs/common';
import { BookingStatusEnum, RoomBookingItem } from 'src/rooms/entities';
import { DataSource } from 'typeorm';
import { RepositoryService } from './repository.class';
import { queryGenerator } from '../utils/query.utils';
import { CompareOperator } from './repository.interface';

@Injectable()
export class RoomBookingItemRepository extends RepositoryService<RoomBookingItem> {
    constructor(dataSource: DataSource) {
        super(RoomBookingItem, dataSource.createEntityManager());
    }
}

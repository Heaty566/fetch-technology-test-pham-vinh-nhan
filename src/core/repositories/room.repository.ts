import { Injectable } from '@nestjs/common';
import { RepositoryService } from './repository.class';
import { DataSource } from 'typeorm';
import { Room } from '../../rooms/entities';
import { QueryFilterRoomForAdminV1Dto } from 'src/rooms/dto/adminFilterRoom.dto';
import { CompareOperator } from './repository.interface';
import { queryGenerator } from '../utils/query.utils';
import { PagingFilter } from '../dtos';

@Injectable()
export class RoomRepository extends RepositoryService<Room> {
    constructor(dataSource: DataSource) {
        super(Room, dataSource.createEntityManager());
    }

    async findRoomById(id: string) {
        return await this.findOne({ where: { id } });
    }

    async findRoomByType(type: string) {
        return await this.findOne({ where: { type } });
    }

    async findRoomsForAdminWithFilter(filters: QueryFilterRoomForAdminV1Dto) {
        const { tableName } = this.metadata;
        const { filterValues, queryString } = queryGenerator(filters, {
            type: {
                tableName,
                compareKey: 'type',
                operator: CompareOperator.LIKE,
            },
        });

        return this.paging(
            this.createQueryBuilder(tableName).where(queryString, filterValues),
            filterValues,
        );
    }

    async findAvailableRoomsWithFilter(
        bookedRoomIds: string[],
        filters: PagingFilter,
    ) {
        const { tableName } = this.metadata;
        const { filterValues, queryString } = queryGenerator(
            { bookedRoomIds, ...filters },
            {
                bookedRoomIds: {
                    tableName,
                    compareKey: 'id',
                    operator: CompareOperator.NOT_IN,
                },
            },
        );

        return this.paging(
            this.createQueryBuilder(tableName).where(queryString, filterValues),
            filterValues,
        );
    }
}

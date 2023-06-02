import { Injectable } from '@nestjs/common';
import { RepositoryService } from './repository.class';
import { DataSource } from 'typeorm';
import { Room } from '../../rooms/entities';
import { QueryFilterRoomForAdminDto } from 'src/rooms/dto/filterAdminRoom.dto';
import { CompareOperator } from './repository.interface';
import { queryGenerator } from '../utils/query.utils';

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

    async findRoomsForAdminWithFilter(filters: QueryFilterRoomForAdminDto) {
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
}

import { Injectable } from '@nestjs/common';
import { RoomRepository } from '../core/repositories';
import { ServerHttpException } from '../core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import { RoomStatusEnum } from './entities';

@Injectable()
export class RoomsService {
    constructor(private readonly roomRepository: RoomRepository) {}

    private async _getAndCheckRoomExisted(roomId: string) {
        const room = await this.roomRepository.findRoomById(roomId);
        if (!room || room.status === RoomStatusEnum.DELETED) {
            throw new ServerHttpException(
                'Room not found',
                StatusCodes.NOT_FOUND,
            );
        }

        return room;
    }

    async findRoomByIdV1(roomId: string) {
        const room = await this._getAndCheckRoomExisted(roomId);

        return room;
    }
}

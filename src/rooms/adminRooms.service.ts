import { Injectable } from '@nestjs/common';
import { RoomRepository } from 'src/core/repositories';
import { CreateRoomV1Dto } from './dto/createRoom.dto';
import { Room, RoomStatusEnum } from './entities';
import { ServerHttpException } from 'src/core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import { EditRoomV1Dto } from './dto/editRoom.dto';
import { QueryFilterRoomForAdminV1Dto } from './dto/adminFilterRoom.dto';

@Injectable()
export class AdminRoomsService {
    constructor(private readonly roomRepository: RoomRepository) {}

    private async _getAndCheckRoomExisted(roomId: string) {
        const room = await this.roomRepository.findRoomById(roomId);
        if (!room) {
            throw new ServerHttpException(
                'Room not found',
                StatusCodes.NOT_FOUND,
            );
        }

        return room;
    }

    private async _createRoomObject(input: CreateRoomV1Dto) {
        const room = new Room();
        room.description = input.description;
        room.price = input.price;
        room.quantity = input.quantity;
        room.type = input.type;
        return this.roomRepository.save(room);
    }

    async createRoomV1(body: CreateRoomV1Dto) {
        const existedRoom = await this.roomRepository.findRoomByType(body.type);

        if (existedRoom) {
            throw new ServerHttpException(
                'Room Type already existed',
                StatusCodes.BAD_REQUEST,
            );
        }

        return await this._createRoomObject(body);
    }

    async findRoomByIdV1(roomId: string) {
        const room = await this._getAndCheckRoomExisted(roomId);

        return room;
    }

    async deleteRoomByIdV1(roomId: string) {
        const room = await this._getAndCheckRoomExisted(roomId);
        room.status = RoomStatusEnum.DELETED;

        return await this.roomRepository.save(room);
    }

    async editRoomByIdV1(roomId: string, body: EditRoomV1Dto) {
        const room = await this._getAndCheckRoomExisted(roomId);

        //check if room type existed
        const existedRoom = await this.roomRepository.findRoomByType(body.type);
        if (existedRoom && existedRoom.id !== roomId) {
            throw new ServerHttpException(
                'Room type already existed',
                StatusCodes.BAD_REQUEST,
            );
        }

        room.description = body.description;
        room.price = body.price;
        room.quantity = body.quantity;
        room.type = body.type;

        return await this.roomRepository.save(room);
    }

    async findRoomsForAdminWithFilterV1(query: QueryFilterRoomForAdminV1Dto) {
        return this.roomRepository.findRoomsForAdminWithFilter(query);
    }
}

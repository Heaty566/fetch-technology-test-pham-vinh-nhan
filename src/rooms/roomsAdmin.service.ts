import { Injectable } from '@nestjs/common';
import { RoomRepository } from 'src/core/repositories';
import { CreateRoomDto } from './dto/createRoom.dto';
import { Room, RoomStatusEnum } from './entities';
import { ServerHttpException } from 'src/core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import { EditRoomDto } from './dto/editRoom.dto';
import { QueryFilterRoomForAdminDto } from './dto/filterAdminRoom.dto';

@Injectable()
export class RoomsAdminService {
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

    private async _createRoomObject(input: CreateRoomDto) {
        const room = new Room();
        room.description = input.description;
        room.price = input.price;
        room.quantity = input.quantity;
        room.type = input.type;
        return this.roomRepository.save(room);
    }

    async createRoomV1(body: CreateRoomDto) {
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

    async editRoomByIdV1(roomId: string, body: EditRoomDto) {
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

    async findRoomsForAdminWithFilterV1(query: QueryFilterRoomForAdminDto) {
        return this.roomRepository.findRoomsForAdminWithFilter(query);
    }
}

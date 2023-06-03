import { Controller, Get, Param, UseGuards, Version } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../core/guards';
import { ValidatorUuidPipe } from '../core/pipes';

@ApiTags('Rooms')
@Controller('/rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Version('1')
    @Get('/:roomId')
    async findRoomByIdV1(
        @Param('roomId', new ValidatorUuidPipe()) roomId: string,
    ) {
        return await this.roomsService.findRoomByIdV1(roomId);
    }
}

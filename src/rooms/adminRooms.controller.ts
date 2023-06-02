import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    Version,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RoleGuard } from '../core/guards';
import {
    CreateRoomV1Dto,
    createRoomValidationV1ValidationSchema,
} from './dto/createRoom.dto';
import { JoiValidatorPipe, QueryJoiValidatorPipe } from 'src/core/pipes';
import { AdminRoomsService } from './adminRooms.service';
import { UserRoleNameEnum } from 'src/users/entities';
import { ValidatorUuidPipe } from 'src/core/pipes';
import {
    EditRoomV1Dto,
    editRoomValidationV1ValidationSchema,
} from './dto/editRoom.dto';
import {
    QueryFilterRoomForAdminV1Dto,
    queryFilterRoomForAdminV1ValidationSchema,
} from './dto/adminFilterRoom.dto';

@ApiTags('Admin Rooms')
@Controller('/admin/rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AdminRoomsController {
    constructor(private readonly roomsAdminService: AdminRoomsService) {}

    @Version('1')
    @RoleGuard([UserRoleNameEnum.ADMIN])
    @Get()
    async getPagingRoomsV1(
        @Query(
            new QueryJoiValidatorPipe(
                queryFilterRoomForAdminV1ValidationSchema,
            ),
        )
        query: QueryFilterRoomForAdminV1Dto,
    ) {
        return await this.roomsAdminService.findRoomsForAdminWithFilterV1(
            query,
        );
    }

    @Version('1')
    @RoleGuard([UserRoleNameEnum.ADMIN])
    @Post()
    async createRoomV1(
        @Body(new JoiValidatorPipe(createRoomValidationV1ValidationSchema))
        body: CreateRoomV1Dto,
    ) {
        return await this.roomsAdminService.createRoomV1(body);
    }

    @Version('1')
    @RoleGuard([UserRoleNameEnum.ADMIN])
    @Get('/:roomId')
    async findRoomByIdV1(
        @Param('roomId', new ValidatorUuidPipe()) roomId: string,
    ) {
        return await this.roomsAdminService.findRoomByIdV1(roomId);
    }

    @Version('1')
    @RoleGuard([UserRoleNameEnum.ADMIN])
    @Delete('/:roomId')
    async deleteRoomByIdV1(
        @Param('roomId', new ValidatorUuidPipe()) roomId: string,
    ) {
        return await this.roomsAdminService.deleteRoomByIdV1(roomId);
    }

    @Version('1')
    @RoleGuard([UserRoleNameEnum.ADMIN])
    @Put('/:roomId')
    async editRoomByIdV1(
        @Param('roomId', new ValidatorUuidPipe()) roomId: string,
        @Body(new JoiValidatorPipe(editRoomValidationV1ValidationSchema))
        body: EditRoomV1Dto,
    ) {
        return await this.roomsAdminService.editRoomByIdV1(roomId, body);
    }
}

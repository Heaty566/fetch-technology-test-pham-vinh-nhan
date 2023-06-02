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
    CreateRoomDto,
    createRoomValidationSchema,
} from './dto/createRoom.dto';
import { JoiValidatorPipe, QueryJoiValidatorPipe } from 'src/core/pipes';
import { RoomsAdminService } from './roomsAdmin.service';
import { UserRoleNameEnum } from 'src/users/entities';
import { ValidatorUuidPipe } from 'src/core/pipes';
import { EditRoomDto, editRoomValidationSchema } from './dto/editRoom.dto';
import {
    QueryFilterRoomForAdminDto,
    queryFilterRoomForAdminValidationSchema,
} from './dto/filterAdminRoom.dto';

@ApiTags('Admin Rooms')
@Controller('/admin/rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RoomsAdminController {
    constructor(private readonly roomsAdminService: RoomsAdminService) {}

    @Version('1')
    @RoleGuard([UserRoleNameEnum.ADMIN])
    @Get()
    async getPagingRoomsV1(
        @Query(
            new QueryJoiValidatorPipe(queryFilterRoomForAdminValidationSchema),
        )
        query: QueryFilterRoomForAdminDto,
    ) {
        return await this.roomsAdminService.findRoomsForAdminWithFilterV1(
            query,
        );
    }

    @Version('1')
    @RoleGuard([UserRoleNameEnum.ADMIN])
    @Post()
    async createRoomV1(
        @Body(new JoiValidatorPipe(createRoomValidationSchema))
        body: CreateRoomDto,
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
        @Body(new JoiValidatorPipe(editRoomValidationSchema))
        body: EditRoomDto,
    ) {
        return await this.roomsAdminService.editRoomByIdV1(roomId, body);
    }
}

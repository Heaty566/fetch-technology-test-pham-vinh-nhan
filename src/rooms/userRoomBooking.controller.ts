import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    Version,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../core/guards';
import { JoiValidatorPipe, ValidatorUuidPipe } from 'src/core/pipes';
import { QueryAvailableRoomByDateV1Dto } from './dto/filterAvaibleRoom.dto';
import { RoomBookingService } from './roomBooking.service';
import {
    BookingRoomMeV1Dto,
    BookingRoomV1Dto,
    bookingRoomMeV1ValidationSchema,
    bookingRoomV1ValidationSchema,
} from './dto/bookingRoom.dto';
import { UserRoomBookingService } from './userRoomBooking.service';
import { Request } from 'express';
import {
    UpdateBookingRoomMeV1Dto,
    updateBookingRoomMeV1ValidationSchema,
} from './dto/updateBookingRoom.dto';

@ApiTags('User Room Booking')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/booking/room')
export class UserRoomBookingController {
    constructor(
        private readonly userRoomBookingService: UserRoomBookingService,
    ) {}

    @Version('1')
    @Post('/me')
    async bookingRoomV1Dto(
        @Body(new JoiValidatorPipe(bookingRoomMeV1ValidationSchema))
        body: BookingRoomMeV1Dto,
        @Req() req: Request,
    ) {
        return this.userRoomBookingService.roomBookingMeV1(req.user.id, body);
    }

    @Version('1')
    @Put('/me/:bookingRoomId')
    async updateBookingRoomV1Dto(
        @Param('bookingRoomId', new ValidatorUuidPipe()) id: string,
        @Body(new JoiValidatorPipe(updateBookingRoomMeV1ValidationSchema))
        body: UpdateBookingRoomMeV1Dto,
        @Req() req: Request,
    ) {
        return this.userRoomBookingService.updateRoomBookingMeV1(
            req.user.id,
            id,
            body,
        );
    }
}

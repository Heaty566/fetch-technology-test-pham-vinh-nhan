import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JoiValidatorPipe, ValidatorUuidPipe } from '../core/pipes';

import {
    BookingRoomV1Dto,
    bookingRoomV1ValidationSchema,
    QueryAvailableRoomByDateV1Dto,
    queryAvailableRoomByDateV1ValidationSchema,
    queryAvailableRoomByRangeDateV1ValidationSchema,
    QueryAvailableRoomByRangeDateV1Dto,
} from './dto';
import { RoomBookingService } from './roomBooking.service';
import { RoomsService } from './rooms.service';

@ApiTags('Room Booking')
@Controller('/booking/room')
export class RoomBookingController {
    constructor(
        private readonly roomsService: RoomsService,
        private readonly roomBookingService: RoomBookingService,
    ) {}

    @Version('1')
    @Get('/available')
    async findAvailableRoomByDateV1(
        @Query(new JoiValidatorPipe(queryAvailableRoomByDateV1ValidationSchema))
        filters: QueryAvailableRoomByDateV1Dto,
    ) {
        return await this.roomBookingService.findAvailableRoomByDateV1(filters);
    }

    @Version('1')
    @Get('/available/duaration')
    async findAvailableRoomByRangeDateV1(
        @Query(
            new JoiValidatorPipe(
                queryAvailableRoomByRangeDateV1ValidationSchema,
            ),
        )
        filters: QueryAvailableRoomByRangeDateV1Dto,
    ) {
        return await this.roomBookingService.findAvailableRoomByRangeDateV1(
            filters,
        );
    }

    @Version('1')
    @Post('/')
    async bookingRoomV1Dto(
        @Body(new JoiValidatorPipe(bookingRoomV1ValidationSchema))
        body: BookingRoomV1Dto,
    ) {
        return this.roomBookingService.roomBookingV1(body);
    }

    @Version('1')
    @Delete('/:roomBookingId')
    async cancelRoomBookingV1(
        @Param('roomBookingId', new ValidatorUuidPipe()) roomBookingId: string,
    ) {
        return this.roomBookingService.cancelRoomBookingV1(roomBookingId);
    }
}

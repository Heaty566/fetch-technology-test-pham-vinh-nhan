import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
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
    BookingRoomV1Dto,
    bookingRoomV1ValidationSchema,
} from './dto/bookingRoom.dto';

@ApiTags('Admin Room Booking')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/admin/booking/room')
export class AdminRoomBookingController {
    constructor(
        private readonly roomsService: RoomsService,
        private readonly roomBookingService: RoomBookingService,
    ) {}
}

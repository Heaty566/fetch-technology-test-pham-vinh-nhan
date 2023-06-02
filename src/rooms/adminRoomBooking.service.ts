import { Injectable } from '@nestjs/common';
import { RoomBookingRepository, RoomRepository } from '../core/repositories';
import { ServerHttpException } from '../core/interfaces/class';
import { StatusCodes } from 'http-status-codes';
import { RoomStatusEnum } from './entities';
import { QueryAvailableRoomByDateV1Dto } from './dto/filterAvaibleRoom.dto';
import { BookingRoomV1Dto } from './dto/bookingRoom.dto';
import { RoomBookingService } from './roomBooking.service';

@Injectable()
export class AdminRoomBookingService {
    constructor(
        private readonly roomBookingRepository: RoomBookingRepository,
        private readonly roomRepository: RoomRepository,
        private readonly roomBookingSerive: RoomBookingService,
    ) {}
}

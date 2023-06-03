import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import {
    BookingRoomItem,
    bookingRoomItemValidationSchema,
} from './bookingRoom.dto';

export class UpdateBookingRoomMeV1Dto {
    @ApiProperty({
        description: 'List of room to book',
        example: [],
    })
    rooms: BookingRoomItem[];

    @ApiProperty({})
    name: string;

    @ApiProperty({})
    phone: string;

    @ApiProperty({
        description: 'Start date',
        example: new Date(),
    })
    startDate: Date;

    @ApiProperty({
        description: 'End date',
        example: new Date(),
    })
    endDate: Date;
}

export const updateBookingRoomMeV1ValidationSchema =
    Joi.object<UpdateBookingRoomMeV1Dto>({
        rooms: Joi.array()
            .min(1)
            .items(bookingRoomItemValidationSchema)
            .required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        startDate: Joi.date()
            .iso()
            .options({ convert: true })
            .default('00:00:00')
            .greater('now')
            .required(),
        endDate: Joi.date()
            .iso()
            .options({ convert: true })
            .default('00:00:00')
            .greater(Joi.ref('startDate'))
            .required(),
    });

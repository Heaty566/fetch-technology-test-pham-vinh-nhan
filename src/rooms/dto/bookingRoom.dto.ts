import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class BookingRoomItem {
    @ApiProperty({
        description: 'Room Id',
        example: '',
    })
    roomId: string;

    @ApiProperty({
        description: 'Room Quantity',
        example: 1,
    })
    quantity: number;
}

export const bookingRoomItemValidationSchema = Joi.object<BookingRoomItem>({
    roomId: Joi.string().uuid().required(),
    quantity: Joi.number().min(0).required(),
});

export class BookingRoomV1Dto {
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

export const bookingRoomV1ValidationSchema = Joi.object<BookingRoomV1Dto>({
    rooms: Joi.array().min(1).items(bookingRoomItemValidationSchema).required(),
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

export class BookingRoomMeV1Dto {
    @ApiProperty({
        description: 'List of room to book',
        example: [],
    })
    rooms: BookingRoomItem[];

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

export const bookingRoomMeV1ValidationSchema = Joi.object<BookingRoomMeV1Dto>({
    rooms: Joi.array().min(1).items(bookingRoomItemValidationSchema).required(),
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

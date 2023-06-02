import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
import { roomValidationSchema } from 'src/core/dtos';

export class CreateRoomDto {
    @ApiProperty({ description: 'Description of room', example: 'Nice room' })
    description: string;

    @ApiProperty({ description: 'Quantity of room', example: 10 })
    quantity: number;

    @ApiProperty({ description: 'Price of room', example: 100 })
    price: number;

    @ApiProperty({ description: 'Type of room', example: 'Single bed' })
    type: string;
}

export const createRoomValidationSchema = joi.object<CreateRoomDto>({
    description: roomValidationSchema.description,
    quantity: roomValidationSchema.quantity,
    price: roomValidationSchema.price,
    type: roomValidationSchema.type,
});

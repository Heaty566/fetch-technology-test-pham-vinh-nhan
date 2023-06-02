import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
import { userValidationSchema } from '../../core/dtos';

export class RegisterUserV1Dto {
    @ApiProperty({ description: 'Email', example: 'hello@gmail.com' })
    email: string;

    @ApiProperty({ description: 'Password', example: '123456789Aa' })
    password: string;

    @ApiProperty({ description: 'Full name', example: 'Nguyen Van A' })
    name: string;
}

export const registerUserV1ValidationSchema = joi.object<RegisterUserV1Dto>({
    email: userValidationSchema.email,
    password: userValidationSchema.password,
    name: userValidationSchema.name,
});

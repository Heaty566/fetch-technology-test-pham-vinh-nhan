import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
import { userValidationSchema } from '../../core/dtos';

export class LoginUserV1Dto {
    @ApiProperty({ description: 'Email', example: 'hello@gmail.com' })
    email: string;

    @ApiProperty({ description: 'Password', example: '123456789Aa' })
    password: string;
}

export const loginUserV1ValidationSchema = joi.object<LoginUserV1Dto>({
    email: userValidationSchema.email,
    password: userValidationSchema.password,
});

import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserV1Dto {
    @ApiProperty({ description: 'Email', example: 'hello@gmail.com' })
    email: string;

    @ApiProperty({ description: 'Password', example: '123456' })
    password: string;

    @ApiProperty({ description: 'Full name', example: 'Nguyen Van A' })
    name: string;
}

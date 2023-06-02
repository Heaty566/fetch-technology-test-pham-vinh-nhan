import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserV1Dto, registerUserV1ValidationSchema } from './dto';
import { AuthService } from './auth.service';
import { JoiValidatorPipe } from 'src/core/pipes';
import {
    LoginUserV1Dto,
    loginUserV1ValidationSchema,
} from './dto/loginUser.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Version('1')
    @Post('/register')
    async registerUserV1(
        @Body(new JoiValidatorPipe(registerUserV1ValidationSchema))
        body: RegisterUserV1Dto,
    ) {
        return await this.authService.registerUserV1(body);
    }

    @Version('1')
    @Post('/login')
    async loginUserV1(
        @Body(new JoiValidatorPipe(loginUserV1ValidationSchema))
        body: LoginUserV1Dto,
    ) {
        return await this.authService.loginUserV1(body);
    }
}

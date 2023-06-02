import { Controller, Get, Req, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '../core/guards';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getMeV1(@Req() req: Request) {
        return this.usersService.getUserById(req.user.id);
    }
}

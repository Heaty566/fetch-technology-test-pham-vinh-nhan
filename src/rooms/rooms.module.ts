import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsAdminController } from './roomsAdmin.controller';
import { RoomsAdminService } from './roomsAdmin.service';
import { RoomRepository } from '../core/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Room]), UsersModule],
    controllers: [RoomsController, RoomsAdminController],
    providers: [RoomsService, RoomsAdminService, RoomRepository],
})
export class RoomsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './core/common/config';
import { UsersModule } from './users/users.module';
import { User, UserRole } from './users/entities';
import { RoomsModule } from './rooms/rooms.module';
import { Room, RoomBooking } from './rooms/entities';
import { RoomBookingItem } from './rooms/entities/roomBookingItem.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: config.DB_HOST,
            port: config.DB_PORT,
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            synchronize: true,
            entities: [User, UserRole, Room, RoomBooking, RoomBookingItem],
            migrations: [User, UserRole, Room, RoomBooking, RoomBookingItem],
        }),
        UsersModule,
        RoomsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

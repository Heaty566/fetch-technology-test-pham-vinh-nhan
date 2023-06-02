import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './core/common/config';
import { UsersModule } from './users/users.module';
import { User, UserRole } from './users/entities';

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

            entities: [User, UserRole],
            migrations: [User, UserRole],
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

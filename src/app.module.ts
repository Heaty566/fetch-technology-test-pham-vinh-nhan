import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './core/common/config';

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
            keepConnectionAlive: true,
            entities: [],
            migrations: [],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

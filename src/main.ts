import * as dotenv from 'dotenv';
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './core/logger';
import { middleware } from './core/common/middlewares';
import { config } from './core/common/config';
import { monoLogger } from 'mono-utils-core';
import { constant } from './core/common/constant';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new CustomLoggerService(),
    });
    middleware(app);
    // log config
    monoLogger.log(
        constant.LOGGER.NS.APP_INFO,
        `---------------Configuration--------------------`,
    );
    monoLogger.log(constant.LOGGER.NS.APP_INFO, config);
    monoLogger.log(
        constant.LOGGER.NS.APP_INFO,
        `-----------------------------------`,
    );

    await app.listen(config.PORT, () => {
        monoLogger.log(
            constant.LOGGER.NS.APP_INFO,
            `Current Mode: ${config.NODE_ENV}`,
        );
        monoLogger.log(
            constant.LOGGER.NS.APP_INFO,
            `Listening on port  ${config.PORT}`,
        );
        monoLogger.log(
            constant.LOGGER.NS.APP_INFO,
            `Swagger UI Path: ${config.SWAGGER_PATH}`,
        );
    });
}
bootstrap();

import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as moment from 'moment';
import { monoLogger } from 'mono-utils-core';
import * as morgan from 'morgan';
import { constant } from './constant';
import { config } from './config';
import { winstonLogger } from '../logger';
import { StatusCodes } from 'http-status-codes';
import { NODE_ENV } from '../interfaces';

export function middleware(app: INestApplication) {
    // basic middlewares
    app.use(cookieParser());
    app.use(helmet());
    app.use(compression());
    app.enableCors({ origin: config.CLIENT_URL, credentials: true });
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.setGlobalPrefix(constant.APP.API_PREFIX);
    // swagger
    if (config.NODE_ENV === NODE_ENV.DEVELOPMENT) {
        const configSwagger = new DocumentBuilder()
            .setTitle('Booking apartment')
            .setVersion('1.0')
            .addBearerAuth({
                name: 'Authentication',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                in: 'Header',
                type: 'http',
            })
            .build();
        const document = SwaggerModule.createDocument(app, configSwagger);
        SwaggerModule.setup(config.SWAGGER_PATH, app, document);
    }

    // logger
    app.use(
        morgan(function (tokens, req, res) {
            const resStatus = tokens.status(req, res);
            const resTime = tokens['response-time'](req, res);
            const reqMethod = tokens.method(req, res);
            const reqUrl = tokens.url(req, res);
            const reqIp =
                req.headers['x-real-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress;
            const reqDate = tokens['date'](req, res);

            const content = `${moment(reqDate).format(
                'YYYY-MM-DD HH:mm:ss',
            )} ${reqIp} ${reqMethod} ${reqUrl} ${resStatus} - ${resTime} ms`;

            // log to console
            monoLogger.log(constant.LOGGER.NS.HTTP, content);

            // log to file
            if (resStatus >= StatusCodes.INTERNAL_SERVER_ERROR) {
                winstonLogger.error(content);
            } else if (
                resStatus >= StatusCodes.BAD_REQUEST &&
                resStatus < StatusCodes.INTERNAL_SERVER_ERROR
            ) {
                winstonLogger.warn(content);
            } else {
                winstonLogger.info(content);
            }
        }),
    );
}

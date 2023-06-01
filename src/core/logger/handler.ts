import * as winston from 'winston';
import { constant } from '../common/constant';

export const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: `${constant.LOGGER.FILE_PATH}/error.log`,
            level: 'error',
        }),
        new winston.transports.File({
            filename: `${constant.LOGGER.FILE_PATH}/warn.log`,
            level: 'warn',
        }),
        new winston.transports.File({
            filename: `${constant.LOGGER.FILE_PATH}/info.log`,
            level: 'info',
        }),
    ],
});

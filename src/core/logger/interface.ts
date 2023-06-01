import { LoggerService } from '@nestjs/common';
import { monoLogger } from 'mono-utils-core';
import { constant } from '../common/constant';
import { winstonLogger } from './handler';

export class CustomLoggerService implements LoggerService {
    /**
     * Write a 'log' level log.
     */
    log(...optionalParams: any[]) {
        monoLogger.log(constant.LOGGER.NS.APP_INFO, optionalParams);
        winstonLogger.info(optionalParams);
    }

    /**
     * Write an 'error' level log.
     */
    error(...optionalParams: any[]) {
        monoLogger.log(constant.LOGGER.NS.APP_ERROR, optionalParams);
        winstonLogger.error(optionalParams);
    }

    /**
     * Write a 'warn' level log.
     */
    warn(...optionalParams: any[]) {
        monoLogger.log(constant.LOGGER.NS.APP_WARN, optionalParams);
        winstonLogger.warn(optionalParams);
    }
}

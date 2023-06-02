import { HttpException } from '@nestjs/common';
import { constant } from '../common/constant';
import { StatusCodes } from 'http-status-codes';

export class ServerHttpException extends HttpException {
    constructor(message, statusCode: StatusCodes) {
        if (typeof message === 'string') {
            message = {
                [constant.APP.ERROR_MESSAGE_KEY]: message,
            };
        }

        super(message, statusCode);
    }
}

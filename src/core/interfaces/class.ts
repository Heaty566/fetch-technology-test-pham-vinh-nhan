import { HttpException } from '@nestjs/common';
import { constant } from '../common/constant';

export class ServerHttpException extends HttpException {
    constructor(message, statusCode) {
        if (typeof message === 'string') {
            message = {
                [constant.APP.ERROR_MESSAGE_KEY]: message,
            };
        }

        super(message, statusCode);
    }
}

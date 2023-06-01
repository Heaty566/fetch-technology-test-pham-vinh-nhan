import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError } from 'joi';
import _ from 'lodash';
import { constant } from '../common/constant';
import { ServerHttpException } from '../interfaces/class';

@Injectable()
export class JoiValidatorPipe implements PipeTransform {
    constructor(private readonly validateschema: ObjectSchema) {}

    private _mapJoiError(error: ValidationError) {
        const errorObj = {};
        for (const item of error.details) {
            const errorKey = _.get(
                item,
                'context.key',
                constant.APP.ERROR_MESSAGE_KEY,
            );
            errorObj[errorKey] = item.message;
        }
        return errorObj;
    }

    transform(input: any) {
        // check empty input
        if (!input) {
            throw new ServerHttpException(
                "Can't validate empty input",
                StatusCodes.BAD_REQUEST,
            );
        }

        // validate input
        const { error, value } = this.validateschema.validate(input, {
            abortEarly: false,
        });

        if (error) {
            throw new HttpException(
                this._mapJoiError(error),
                StatusCodes.BAD_REQUEST,
            );
        }

        return value;
    }
}

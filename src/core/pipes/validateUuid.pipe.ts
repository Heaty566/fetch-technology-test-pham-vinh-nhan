import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError } from 'joi';
import * as _ from 'lodash';
import { constant } from '../common/constant';
import { ServerHttpException } from '../interfaces/class';
import * as joi from 'joi';

@Injectable()
export class ValidatorUuidPipe implements PipeTransform {
    transform(input: any) {
        const { error } = joi.string().uuid().required().validate(input);
        if (error) {
            throw new ServerHttpException(
                'Invalid uuid',
                StatusCodes.BAD_REQUEST,
            );
        }

        return input;
    }
}

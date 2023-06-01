import { Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class QueryJoiValidatorPipe implements PipeTransform {
    constructor(private readonly validateSchema: ObjectSchema) {}

    transform(input: any) {
        // validate input
        const { value } = this.validateSchema.validate(input, {
            convert: true,
            stripUnknown: true,
        });
        return value;
    }
}

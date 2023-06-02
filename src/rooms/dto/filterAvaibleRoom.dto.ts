import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';

export class QueryAvailableRoomByDateV1Dto {
    @ApiProperty({
        description: 'Date to filter',
        example: new Date().toISOString(),
    })
    date: Date;
}

export const queryAvailableRoomByDateV1ValidationSchema =
    joi.object<QueryAvailableRoomByDateV1Dto>({
        date: joi
            .date()
            .iso()
            .options({ convert: true })
            .default('00:00:00')
            .iso()
            .min(joi.ref('$tomorrow'))
            .required(),
    });

export class QueryAvailableRoomByRangeDateV1Dto {
    @ApiProperty({
        description: 'Start date to filter',
        example: new Date().toISOString(),
    })
    startDate: Date;

    @ApiProperty({
        description: 'End date to filter',
        example: new Date().toISOString(),
    })
    endDate: Date;
}

export const queryAvailableRoomByRangeDateV1ValidationSchema =
    joi.object<QueryAvailableRoomByRangeDateV1Dto>({
        startDate: joi
            .date()
            .iso()
            .options({ convert: true })
            .default('00:00:00')
            .iso()
            .min(joi.ref('$tomorrow'))
            .required(),
        endDate: joi
            .date()
            .iso()
            .options({ convert: true })
            .default('00:00:00')
            .iso()
            .min(joi.ref('startDate'))
            .required(),
    });

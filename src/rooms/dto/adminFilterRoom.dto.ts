import { ApiProperty } from '@nestjs/swagger';
import { PagingFilter, pagingFilterValidationSchema } from '../../core/dtos';
import * as joi from 'joi';

export class QueryFilterRoomForAdminV1Dto extends PagingFilter {
    @ApiProperty({ description: 'Type of room', example: 'Single bed' })
    type: string;
}

export const queryFilterRoomForAdminV1ValidationSchema =
    joi.object<QueryFilterRoomForAdminV1Dto>({
        type: joi.string().failover('').required(),
        ...pagingFilterValidationSchema,
    });

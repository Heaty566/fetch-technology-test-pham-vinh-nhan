import { ApiProperty } from '@nestjs/swagger';
import { PagingFilter, pagingFilterValidationSchema } from '../../core/dtos';
import * as joi from 'joi';

export class QueryFilterRoomForAdminDto extends PagingFilter {
    @ApiProperty({ description: 'Type of room', example: 'Single bed' })
    type: string;
}

export const queryFilterRoomForAdminValidationSchema =
    joi.object<QueryFilterRoomForAdminDto>({
        type: joi.string().failover('').required(),
        ...pagingFilterValidationSchema,
    });

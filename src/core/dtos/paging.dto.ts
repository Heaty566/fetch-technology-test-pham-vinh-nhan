import { ApiProperty } from '@nestjs/swagger';
import { constant } from '../common/constant';
import { SortOrder } from '../repositories';
import Joi, * as joi from 'joi';

export class PagingFilter {
    @ApiProperty({
        description: 'Page',
        example: constant.APP.PAGING.DEFAULT_PAGE,
        nullable: true,
    })
    page: number;

    @ApiProperty({
        description: 'Page size',
        example: constant.APP.PAGING.DEFAULT_PAGE_SIZE,
        nullable: true,
    })
    pageSize: number;

    @ApiProperty({
        description: 'Order by',
        example: constant.APP.PAGING.DEFAULT_ORDER_BY,
        nullable: true,
    })
    orderBy: string;

    @ApiProperty({
        description: 'Order',
        example: constant.APP.PAGING.DEFAULT_ORDER,
        nullable: true,
    })
    order: SortOrder;

    @ApiProperty({ description: 'Order', example: false, nullable: true })
    isShowDeleted?: boolean = false;
}

export const pagingFilterSchema: Record<keyof PagingFilter, Joi.Schema> = {
    page: joi
        .number()
        .failover(constant.APP.PAGING.DEFAULT_PAGE)
        .min(0)

        .required(),
    pageSize: joi
        .number()
        .failover(constant.APP.PAGING.DEFAULT_PAGE_SIZE)
        .min(0)

        .required(),
    orderBy: joi
        .string()
        .allow('')
        .failover(constant.APP.PAGING.DEFAULT_ORDER_BY)
        .required(),
    order: joi
        .string()
        .allow('')
        .failover(constant.APP.PAGING.DEFAULT_ORDER)
        .valid(SortOrder.ASC, SortOrder.DESC)
        .required(),
    isShowDeleted: joi.boolean().failover(false).required(),
};

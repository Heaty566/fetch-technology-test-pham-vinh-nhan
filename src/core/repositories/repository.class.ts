import { Repository, SelectQueryBuilder } from 'typeorm';
import { CompareOperator, PagingResult } from './repository.interface';
import { monoLogger } from 'mono-utils-core';
import { constant } from '../common/constant';
import { PagingFilter } from '../dtos/paging.dto';

export class RepositoryService<T> extends Repository<T> {
    protected async paging(
        query: SelectQueryBuilder<T>,
        pagingProps: Record<keyof PagingFilter | string, any>,
    ): Promise<PagingResult<T>> {
        const { tableName } = this.metadata;

        // default hide deleted entities
        if (!pagingProps.isShowDeleted) {
            query = query.andWhere(
                `${tableName}.${constant.APP.DEFAULT_STATUS_FIELD} ${CompareOperator.NOT_EQUAL} '${constant.APP.DEFAULT_DELETE_STATUS}'`,
            );
        }

        try {
            const data = await query
                .skip(pagingProps.page * pagingProps.pageSize)
                .take(pagingProps.pageSize)
                .orderBy(
                    `${tableName}.${pagingProps.orderBy}`,
                    pagingProps.order,
                )
                .getMany();

            const count = await query.getCount();

            return { data, count };
        } catch (err) {
            monoLogger.log(constant.LOGGER.NS.APP_ERROR, err.message);
            return { data: [], count: 0 };
        }
    }
}

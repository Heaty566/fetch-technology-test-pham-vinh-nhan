export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum CompareOperator {
    EQUAL = '=',
    NOT_EQUAL = '<>',
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL = '<=',
    GREATER_THAN = '>',
    GREATER_THAN_OR_EQUAL = '>=',
    IN = 'IN',
    NOT_IN = 'NOT IN',
    LIKE = 'LIKE',
}

export interface PagingResult<T> {
    data: Array<T>;
    count: number;
}

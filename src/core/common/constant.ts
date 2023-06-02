export const constant = {
    LOGGER: {
        NS: {
            HTTP: 'http',
            APP_INFO: 'app-info',
            APP_ERROR: 'app-error',
            APP_WARN: 'app-warn',
        },
        FILE_PATH: 'logs',
    },
    CLIENT: {
        HEADER_AUTH_KEY: 'authorization',
    },
    APP: {
        ERROR_MESSAGE_KEY: 'errorMessage',
        PAGING: {
            DEFAULT_PAGE: 0,
            DEFAULT_PAGE_SIZE: 12,
            DEFAULT_ORDER_BY: 'createdAt',
            DEFAULT_ORDER: 'DESC',
        },
        DEFAULT_HASH_SALT: 10,
        DEFAULT_DELETE_STATUS: 'DELETED',
        DEFAULT_STATUS_FIELD: 'status',
        DEFAULT_TOKEN_AGING: 60 * 60 * 24 * 30,
        API_PREFIX: 'api',
    },
};

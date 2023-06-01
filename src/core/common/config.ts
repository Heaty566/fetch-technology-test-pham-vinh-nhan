// Note: Global configuration

export const config = {
    // app config
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    PORT: Number(process.env.PORT) || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SWAGGER_PATH: process.env.SWAGGER_PATH || 'api/explorer',

    // db config
    DB_HOST: process.env.DB_HOST || '',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_NAME: process.env.DB_NAME || '',
    DB_USERNAME: process.env.DB_USERNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
};
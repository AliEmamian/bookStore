

export const redisKeyPrefix = 'typeorm';
export const generateRedisCacheId = (userId): string =>
    `${redisKeyPrefix}_${userId}`;

export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = +process.env.REDIS_PORT
export const REDIS_KEY = process.env.REDIS_KEY
export const REDIS_TTL = { 
    default: +process.env.REDIS_EXPIRATION_DELAY,
};
export const USER_TTL = 60 * 60 * 24;
export const userRedisKey = (phone: string) => `USER:${phone}`;

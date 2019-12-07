import Redis from 'ioredis'

export const providerName = 'REDIS_CLIENT'
export const redisProvider = {
  provide: providerName,
  useFactory,
}

function useFactory() {
  const redis = new Redis()
  return redis
}

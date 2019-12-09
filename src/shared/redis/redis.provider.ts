import Redis from 'ioredis'

export const providerName = {
  publisher: 'REDIS_PUB',
  subscriber: 'REDIS_SUB',
}
export const redisSubscriberProvider = {
  provide: providerName.publisher,
  useFactory,
}

export const redisPublisherProvider = {
  provide: providerName.subscriber,
  useFactory,
}

function useFactory() {
  const redis = new Redis(process.env.REDIS_URI)
  return redis
}

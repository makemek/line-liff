import { RedisModule, providerName as REDIS } from './redis'

export const sharedModules = [
  RedisModule,
]
export const providerParam = {
  REDIS
}

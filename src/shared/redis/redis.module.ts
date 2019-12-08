import { Module, Global } from '@nestjs/common'
// --
import {
  redisSubscriberProvider,
  redisPublisherProvider,
} from './redis.provider'

@Global()
@Module({
  providers: [redisPublisherProvider, redisSubscriberProvider],
  exports: [redisPublisherProvider, redisSubscriberProvider],
})
export class RedisModule {}

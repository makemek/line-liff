import { Controller, Put, Inject } from '@nestjs/common'
import Redis from 'ioredis'
import { providerParam } from '../shared'

@Controller('backoffice')
export class BackofficeController {
  constructor(@Inject(providerParam.REDIS) private readonly redis: Redis.Redis) {}

  @Put('product')
  getHello(): string {
    console.log(this.redis)
    return ''
  }
}

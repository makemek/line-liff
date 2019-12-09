import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  Res,
} from '@nestjs/common'
import { Redis } from 'ioredis'
import { Response } from 'express'
import uuid from 'uuid/v4'

import { ProductService, OrderService, channels } from './backoffice'
import { providerParam } from './shared'

@Controller()
export class AppController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    @Inject(providerParam.REDIS.publisher)
    private readonly redisPub: Redis,
    @Inject(providerParam.REDIS.subscriber)
    private readonly redisSub: Redis,
  ) {}

  @Get('products')
  async getProducts() {
    const products = await this.productService.getProducts()
    return { products }
  }

  @Post('orders')
  async placeOrder(@Body('productId') productId: string) {
    const product = await this.productService.findProductById(
      productId,
    )
    const { name, image, price } = product.toJSON()
    const id = await this.orderService.addOrder({
      product: {
        name,
        image,
        price,
      },
      customerId: '1',
    })

    const eventObject = {
      event: 'order-created',
      payload: { orderId: id },
    }
    this.redisPub.publish(
      channels.ORDERS,
      JSON.stringify(eventObject),
    )

    return { id }
  }

  @Get('/events')
  async listenOrderEvent(@Res() res: Response) {
    res.set({
      Connection: 'keep-alive',
      ['Content-Type']: 'text/event-stream',
      ['Cache-Control']: 'no-cache',
    })
    const listenChannels = [channels.PRODUCTS, channels.ORDERS]
    await this.redisSub.subscribe(...listenChannels)
    this.redisSub.on('message', (channel, message) => {
      if (!listenChannels.includes(channel)) {
        return
      }
      const { event, payload } = JSON.parse(message)
      res.write(`id: ${uuid()}\n`)
      res.write(`event: ${event}\n`)
      res.write(`data: ${JSON.stringify(payload)}\n\n`)
    })

    const retryMilliseconds = 3000
    res.write(`retry: ${retryMilliseconds}\n\n`)
  }
}

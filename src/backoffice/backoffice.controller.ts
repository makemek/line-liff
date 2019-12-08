import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  Inject,
  Res,
} from '@nestjs/common'
import { Redis } from 'ioredis'
import uuid from 'uuid/v4'
import { Response } from 'express'

import { ProductService } from './product'
import { OrderService } from './order'
import { providerParam } from '../shared'
import { channels } from './channels'

@Controller('backoffice')
export class BackofficeController {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    @Inject(providerParam.REDIS.subscriber)
    private readonly redisSub: Redis,
  ) {}

  @Post('product')
  async addProduct(
    @Body('name') name: string,
    @Body('image') image: string,
    @Body('price') price: number,
  ) {
    const id = await this.productService.addProduct({
      name,
      image,
      price,
    })
    return { id }
  }

  @Get('product')
  async getProducts() {
    const products = await this.productService.getProducts()
    return { products }
  }

  @Delete('product/:id')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id)
    return { id }
  }

  @Get('order')
  async getOrders() {
    const orders = await this.orderService.getOrders()
    return { orders }
  }

  @Delete('order/:id')
  async deleteOrder(@Param('id') id: string) {
    await this.orderService.deleteOrder(id)
    return { id }
  }

  @Put('order/:id/serve')
  async serveOrder(@Param('id') orderId: string) {
    const id = await this.orderService.serveOrder(orderId)
    return { id }
  }

  @Get('order/event')
  async listenOrderEvent(@Res() res: Response) {
    res.set({
      Connection: 'keep-alive',
      ['Content-Type']: 'text/event-stream',
      ['Cache-Control']: 'no-cache',
    })
    await this.redisSub.subscribe(channels.ORDERS)
    this.redisSub.on('message', (channel, message) => {
      if (channel !== channels.ORDERS) {
        return
      }
      res.write(`id: ${uuid()}\n`)
      res.write('event: order\n')
      res.write(`data: ${message}\n\n`)
    })

    const retryMilliseconds = 3000
    res.write(`retry: ${retryMilliseconds}\n\n`)
  }
}

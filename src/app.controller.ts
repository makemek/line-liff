import { Controller, Post, Body, Get, Inject } from '@nestjs/common'
import { Redis } from 'ioredis'

import { ProductService, OrderService, channels } from './backoffice'
import { providerParam } from './shared'

@Controller()
export class AppController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    @Inject(providerParam.REDIS.publisher)
    private readonly redisPub: Redis,
  ) {}

  @Get('product')
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

    this.redisPub.publish(channels.ORDERS, id)

    return { id }
  }
}

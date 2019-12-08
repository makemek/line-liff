import { Controller, Post, Body, Get } from '@nestjs/common'

import { ProductService, OrderService } from './backoffice'

@Controller()
export class AppController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  @Get('product')
  async getProducts() {
    const products = await this.productService.getProducts()
    return { products }
  }

  @Post('place-order')
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
    return { id }
  }
}

import { Controller, Put, Body, Get } from '@nestjs/common'
import { ProductService } from './product'

@Controller('backoffice')
export class BackofficeController {
  constructor(private readonly productService: ProductService) {}

  @Put('product')
  async addProduct(
    @Body('name') name: string,
    @Body('image') image: string,
    @Body('price') price: Number,
  ) {
    const id = await this.productService.addProduct({ name, image, price })
    return { id }
  }

  @Get('product')
  async getProducts() {
    
  }
}

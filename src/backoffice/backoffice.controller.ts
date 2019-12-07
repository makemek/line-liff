import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common'
import { ProductService } from './product'

@Controller('backoffice')
export class BackofficeController {
  constructor(private readonly productService: ProductService) {}

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
}

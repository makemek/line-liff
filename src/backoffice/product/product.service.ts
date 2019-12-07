import { Injectable } from '@nestjs/common'
import { ProductRepository } from './product.repository'

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async addProduct({ name, image, price }) {
    const { _id } = await this.repository.insert({
      name,
      image,
      price,
    })
    return _id as string
  }

  async getProducts() {
    const products = await this.repository.findAll()
    return products
  }

  async deleteProduct(id: string) {
    return await this.repository.deleteProduct(id)
  }
}

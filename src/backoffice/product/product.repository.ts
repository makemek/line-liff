import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IProduct } from './product.model'

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<IProduct>,
  ) {}

  async findAll() {
    const products = await this.productModel.find().exec()
    return products
  }

  insert(model: object) {
    const newProduct = new this.productModel(model)
    return newProduct.save()
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel
      .deleteOne({ _id: prodId })
      .exec()
    const found = result.n > 0
    if (!found) {
      throw new NotFoundException('Could not find product.')
    }
  }
}

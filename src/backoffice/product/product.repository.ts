import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IProduct } from './product.model'
import { modelName } from './product.model'

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(modelName)
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

  async findProductById(id: string) {
    let product: IProduct
    const notFoundException = new NotFoundException(
      `Could not find product id '${id}'`,
    )
    try {
      product = await this.productModel.findById(id).exec()
    } catch {
      throw notFoundException
    }
    if (!product) {
      throw notFoundException
    }

    return product
  }
}

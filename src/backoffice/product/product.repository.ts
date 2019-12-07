import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IProduct } from './product.model'

@Injectable()
export class ProductRepository {
  constructor(@InjectModel('Product') private readonly productModel: Model<IProduct>) {}

  async findAll() {
    const products = await this.productModel.find().exec()
    return products as IProduct[]
  }

  insert(model: IProduct) {
    const newProduct = new this.productModel(model)
    return newProduct.save()
  }
}

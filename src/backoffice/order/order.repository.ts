import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IOrder, STATUS } from './order.model'
import { modelName } from './order.model'

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(modelName)
    private readonly orderModel: Model<IOrder>,
  ) {}

  async findAll(sortOptions?: object) {
    const orders = await this.orderModel
      .find()
      .sort(sortOptions)
      .exec()
    return orders
  }

  insert(model: object) {
    const newOrder = new this.orderModel(model)
    return newOrder.save()
  }

  async deleteOrder(orderId: string) {
    const result = await this.orderModel
      .deleteOne({ _id: orderId })
      .exec()
    const found = result.n > 0
    if (!found) {
      throw new NotFoundException('Could not find order.')
    }
  }

  async updateStatus(orderId: string, status: STATUS) {
    return await this.orderModel.findByIdAndUpdate(orderId, {
      status,
    })
  }
}

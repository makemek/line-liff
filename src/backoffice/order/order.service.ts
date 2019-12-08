import { Injectable } from '@nestjs/common'
import { OrderRepository } from './order.repository'
import { STATUS } from './order.model'

@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  async addOrder({ customerId, product }) {
    const { _id } = await this.repository.insert({
      customerId,
      product,
      status: STATUS.PENDING,
      dateCreated: Date.now(),
    })
    return _id as string
  }

  async getOrders() {
    const orders = await this.repository.findAll({
      dateCreated: 'desc',
    })
    return orders
  }

  async deleteOrder(id: string) {
    return await this.repository.deleteOrder(id)
  }

  async serveOrder(id: string) {
    const { _id } = await this.repository.updateStatus(
      id,
      STATUS.SERVED,
    )
    return _id as string
  }
}

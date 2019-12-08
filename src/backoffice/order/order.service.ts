import { Injectable } from '@nestjs/common'
import { OrderRepository } from './order.repository'

@Injectable()
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  async addOrder({ customerId, product }) {
    const { _id } = await this.repository.insert({
      customerId,
      product,
    })
    return _id as string
  }

  async getOrders() {
    const orders = await this.repository.findAll()
    return orders
  }

  async deleteOrder(id: string) {
    return await this.repository.deleteOrder(id)
  }
}

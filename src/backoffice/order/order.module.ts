import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OrderRepository } from './order.repository'
import { OrderService } from './order.service'
import { OrderSchema, modelName } from './order.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: modelName, schema: OrderSchema },
    ]),
  ],
  providers: [OrderRepository, OrderService],
  exports: [OrderService],
})
export class OrderModule {}

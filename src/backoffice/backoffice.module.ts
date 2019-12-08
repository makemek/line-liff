import { Module } from '@nestjs/common'

import { BackofficeController } from './backoffice.controller'
import { ProductModule } from './product'
import { OrderModule } from './order'

@Module({
  imports: [ProductModule, OrderModule],
  controllers: [BackofficeController],
  exports: [ProductModule, OrderModule],
})
export class BackofficeModule {}

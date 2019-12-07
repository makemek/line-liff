import { Module } from '@nestjs/common'
// --
import { BackofficeController } from './backoffice.controller'
import { ProductModule } from './product'

@Module({
  imports: [ProductModule],
  controllers: [BackofficeController],
})
export class BackofficeModule {}

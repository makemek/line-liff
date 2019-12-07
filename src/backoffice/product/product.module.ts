import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductRepository } from './product.repository'
import { ProductService } from './product.service'
import { ProductSchema } from './product.model'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}])],
  providers: [ProductRepository, ProductService],
  exports: [ProductService],
})
export class ProductModule {}

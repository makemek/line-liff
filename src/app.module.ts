import { Module } from '@nestjs/common'
import { sharedModules } from './shared'
import { BackofficeModule } from './backoffice'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ...sharedModules,
    BackofficeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/line-liff', {useNewUrlParser: true, useUnifiedTopology: true})
  ],
})
export class AppModule {}

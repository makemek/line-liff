import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { sharedModules } from './shared'
import { BackofficeModule } from './backoffice'
import { AppController } from './app.controller'

@Module({
  imports: [
    ...sharedModules,
    BackofficeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/line-liff', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

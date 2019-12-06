import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { sharedModules } from './shared'
import { BackofficeModule } from './backoffice'

@Module({
  imports: [...sharedModules, BackofficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

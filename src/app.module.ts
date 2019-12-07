import { Module } from '@nestjs/common'
import { sharedModules } from './shared'
import { BackofficeModule } from './backoffice'

@Module({
  imports: [...sharedModules, BackofficeModule],
})
export class AppModule {}

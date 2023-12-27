import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerificationProviderService } from './module/verification-provider/verification-provider.service';
import { VerificationProviderService } from './modules/verification-provider/verification-provider.service';
import { VerificationProviderController } from './modules/verification-provider/verification-provider.controller';

@Module({
  imports: [],
  controllers: [AppController, VerificationProviderController],
  providers: [AppService, VerificationProviderService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerificationProviderController } from './modules/verification-provider/controllers/verification-provider.controller';
import { VerificationProviderService } from './modules/verification-provider/services/verification-provider.service';


@Module({
  imports: [],
  controllers: [AppController, VerificationProviderController],
  providers: [AppService, VerificationProviderService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ProviderFactory } from '../../factories/provider.factory';
import { VerificationServiceController } from './verification-service.controller';

@Module({
  imports: [],
  providers: [VerificationService, ProviderFactory],
  controllers: [VerificationServiceController],
  exports: [VerificationService],
})
export class VerificationServiceModule {}

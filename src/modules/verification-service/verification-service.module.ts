import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ProviderFactory } from '../../factories/provider.factory';
import { VerificationServiceController } from './verification-service.controller';
import { YouVerifyProvider } from '../../providers/youverify.provider';
import { TruliooProvider } from '../../providers/trulioo.provider';
import { IdenfyProvider } from '../../providers/idenfy.provider';
import { VerificationServiceConfigModule } from '../verification-service-config/verification-service-config.module';
import { VerificationProviderModule } from '../verification-provider/verification-provider.module';

@Module({
  imports: [VerificationServiceConfigModule, VerificationProviderModule],
  providers: [
    VerificationService,
    ProviderFactory,
    YouVerifyProvider,
    TruliooProvider,
    IdenfyProvider,
  ],
  controllers: [VerificationServiceController],
  exports: [VerificationService],
})
export class VerificationServiceModule {}

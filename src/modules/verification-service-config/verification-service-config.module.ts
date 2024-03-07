import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationServiceConfig } from './data/verification-service-config.entity';
import { VerificationServiceConfigRepository } from './data/verification-service-config.repository';
import { VerificationServiceConfigService } from './verification-service-config.service';
import { VerificationServiceConfigController } from './verification-service-config.controller';
import { YouVerifyProvider } from '../../providers/youverify.provider';
import { IdenfyProvider } from '../../providers/idenfy.provider';
import { TruliooProvider } from '../../providers/trulioo.provider';
import { ProviderFactory } from '../../factories/provider.factory';
import { VerificationProviderService } from '../verification-provider/verification-provider.service';
import { VerificationProviderRepository } from '../verification-provider/data/verification-provider.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationServiceConfig])],
  providers: [
    VerificationServiceConfigRepository,
    VerificationServiceConfigService,
    YouVerifyProvider,
    IdenfyProvider,
    TruliooProvider,
    ProviderFactory,
    VerificationProviderService,
    VerificationProviderRepository,
  ],
  controllers: [VerificationServiceConfigController],
  exports: [VerificationServiceConfigService],
})
export class VerificationServiceConfigModule {}

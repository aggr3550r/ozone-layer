import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationProviderRepository } from './data/verification-provider.repository';
import { VerificationProviderController } from './verification-provider.controller';
import { VerificationProviderService } from './verification-provider.service';
import { VerificationProvider } from './data/verification-provider.entity';
import { ProviderFactory } from '../../factories/provider.factory';
import { YouVerifyProvider } from '../../providers/youverify.provider';
import { IdenfyProvider } from '../../providers/idenfy.provider';
import { TruliooProvider } from '../../providers/trulioo.provider';
import { VerificationServiceConfigModule } from '../verification-service-config/verification-service-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationProvider]),
    VerificationServiceConfigModule,
  ],
  providers: [
    VerificationProviderRepository,
    VerificationProviderService,
    ProviderFactory,
    YouVerifyProvider,
    IdenfyProvider,
    TruliooProvider,
  ],
  controllers: [VerificationProviderController],
  exports: [VerificationProviderService],
})
export class VerificationProviderModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationServiceConfig } from './data/verification-service-config.entity';
import { VerificationServiceConfigRepository } from './data/verification-service-config.repository';
import { VerificationServiceConfigService } from './verification-service-config.service';
import { VerificationServiceConfigController } from './verification-service-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationServiceConfig])],
  providers: [
    VerificationServiceConfigRepository,
    VerificationServiceConfigService,
  ],
  controllers: [VerificationServiceConfigController],
  exports: [VerificationServiceConfigService],
})
export class VerificationServiceConfigModule {}

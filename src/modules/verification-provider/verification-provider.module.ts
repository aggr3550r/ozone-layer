import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationProviderRepository } from './data/verification-provider.repository';
import { VerificationProviderController } from './verification-provider.controller';
import { VerificationProviderService } from './verification-provider.service';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationProvider])],
  providers: [VerificationProviderRepository, VerificationProviderService],
  controllers: [VerificationProviderController],
  exports: [VerificationProviderService],
})
export class VerificationProvider {}

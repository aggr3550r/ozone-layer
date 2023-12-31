import { Injectable } from '@nestjs/common';
import { VerificationServiceConfig } from './verification-service-config.entity';
import { GenericRepository } from '../../generic.repository';
import { IVerificationServiceConfigRepository } from '../../../interfaces/database/IVerificationServiceConfigRepository';

@Injectable()
export class VerificationServiceConfigRepository
  extends GenericRepository<VerificationServiceConfig>
  implements IVerificationServiceConfigRepository<VerificationServiceConfig> {}

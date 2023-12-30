import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../../interfaces/database/IGenericRepository';
import { VerificationServiceConfig } from './verification-service-config.entity';
import { GenericRepository } from '../../generic.repository';

@Injectable()
export class VerificationServiceConfigRepository
  extends GenericRepository<VerificationServiceConfig>
  implements IGenericRepository<VerificationServiceConfig> {}







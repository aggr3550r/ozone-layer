import { Injectable } from '@nestjs/common';
import { VerificationServiceConfig } from './verification-service-config.entity';
import { GenericRepository } from '../../generic.repository';

@Injectable()
export class VerificationServiceConfigRepository extends GenericRepository<VerificationServiceConfig> {}

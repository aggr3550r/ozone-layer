import { Injectable } from '@nestjs/common';
import { VerificationProvider } from './verification-provider.entity';
import { GenericRepository } from '../../generic.repository';

@Injectable()
export class VerificationProviderRepository extends GenericRepository<VerificationProvider> {}

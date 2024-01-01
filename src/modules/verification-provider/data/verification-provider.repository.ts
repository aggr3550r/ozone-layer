import { Injectable } from '@nestjs/common';
import { VerificationProvider } from './verification-provider.entity';
import { GenericRepository } from '../../generic.repository';
import { IVerificationProviderRepository } from '../../../interfaces/database/IVerificationProviderRepository';

@Injectable()
export class VerificationProviderRepository
  extends GenericRepository<VerificationProvider>
  implements IVerificationProviderRepository<VerificationProvider> {}

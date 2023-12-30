import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../../interfaces/database/IGenericRepository';
import { VerificationProvider } from './verification-provider.entity';
import { GenericRepository } from '../../generic.repository';

@Injectable()
export class VerificationProviderRepository
  extends GenericRepository<VerificationProvider>
  implements IGenericRepository<VerificationProvider> {}

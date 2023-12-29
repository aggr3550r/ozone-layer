import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../../interfaces/database/IGenericRepository';
import { VerificationProvider } from './verification-provider.entity';

@Injectable()
export class VerificationProviderRepository
  implements IGenericRepository<VerificationProvider>
{
  findById(id: string, withFields?: boolean): Promise<VerificationProvider> {
    throw new Error('Method not implemented.');
  }
  create(data: Partial<VerificationProvider>): Promise<VerificationProvider> {
    throw new Error('Method not implemented.');
  }
  update(
    criteria: Partial<VerificationProvider>,
    data: Partial<VerificationProvider>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(criteria: Partial<VerificationProvider>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

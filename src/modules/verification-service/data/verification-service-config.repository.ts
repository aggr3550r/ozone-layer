import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../../interfaces/database/IGenericRepository';
import { VerificationServiceConfig } from './verification-service-config.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VerificationServiceConfigRepository
  implements IGenericRepository<VerificationServiceConfig>
{
  constructor(
    private repository: Repository<VerificationServiceConfig>,
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(VerificationServiceConfig);
  }

  findById(
    id: string,
    withFields?: boolean,
  ): Promise<VerificationServiceConfig> {
    throw new Error('Method not implemented.');
  }
  create(
    data: Partial<VerificationServiceConfig>,
  ): Promise<VerificationServiceConfig> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<VerificationServiceConfig>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VerificationProvider } from './verification-provider.entity';

@Injectable()
export class VerificationProviderRepository extends Repository<VerificationProvider> {
  constructor(private dataSource: DataSource) {
    super(VerificationProvider, dataSource.createEntityManager());
  }
}
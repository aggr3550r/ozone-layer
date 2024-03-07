import { Injectable } from '@nestjs/common';
import { VerificationServiceConfig } from './verification-service-config.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VerificationServiceConfigRepository extends Repository<VerificationServiceConfig> {
  constructor(private readonly dataSource: DataSource) {
    super(VerificationServiceConfig, dataSource.createEntityManager());
  }
}

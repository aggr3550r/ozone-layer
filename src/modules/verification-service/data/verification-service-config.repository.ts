import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../../interfaces/database/IGenericRepository';
import { VerificationServiceConfig } from './verification-service-config.entity';
import { DataSource, FindManyOptions, Repository, UpdateResult } from 'typeorm';
import {
  CreateVerificationServiceConfigDTO,
  FindServiceConfigByCriteriaDTO,
  UpdateVerificationServiceConfigDTO,
  VerificationServiceConfigDTO,
} from '../../../dtos/verification-service.dto';

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

  public async findByCode(code: string): Promise<VerificationServiceConfig> {
    return await this.findByCriteria({ code });
  }

  public async create(
    data: CreateVerificationServiceConfigDTO,
  ): Promise<VerificationServiceConfigDTO> {
    const newServiceConfig = this.repository.create(data);

    //TODO: Attach provider to service at the point of creation but make this attachment optional.

    return await this.repository.save(newServiceConfig);
  }

  public async update(
    criteria: Partial<VerificationServiceConfigDTO>,
    data: UpdateVerificationServiceConfigDTO,
  ): Promise<UpdateResult> {
    const where: FindManyOptions<VerificationServiceConfig>['where'] = {
      ...criteria,
    };

    const updateResult = await this.repository.update(where, data);

    return updateResult;
  }

  public async delete(criteria: FindServiceConfigByCriteriaDTO): Promise<void> {
    await this.repository.update(criteria, { is_active: false });
  }

  public async findById(id: string): Promise<VerificationServiceConfig> {
    return await this.findByCriteria({ id }, false);
  }

  private async findByCriteria(
    criteria: FindServiceConfigByCriteriaDTO,
    whereIsActive: boolean = true,
  ) {
    const where: FindManyOptions<VerificationServiceConfig>['where'] = {
      ...criteria,
    };

    if (whereIsActive) {
      where.is_active = true;
    }

    const config = await this.repository.findOne({
      where,
    });

    return config;
  }
}

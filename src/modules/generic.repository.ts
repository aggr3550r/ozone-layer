import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { BaseDTO } from '../dtos/base.dto';
import { IGenericRepository } from '../interfaces/database/IGenericRepository';

@Injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
  constructor(public repository: Repository<T>) {}

  public async findById(id: string): Promise<T> {
    return await this.findByCriteria({ id });
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    const newServiceConfig = this.repository.create(data);
    return await this.repository.save(newServiceConfig);
  }

  public async update(criteria: any, data: any): Promise<any> {
    const updateResult = await this.repository.update({ ...criteria }, data);

    return updateResult;
  }

  public async delete(criteria: Partial<T>): Promise<void> {
    return await this.update(criteria, { is_active: false });
  }

  public async findByCriteria(criteria: any): Promise<T> {
    const where: FindManyOptions<T & BaseDTO>['where'] = {
      ...criteria,
      is_active: true,
    };

    const data = await this.repository.findOne({
      where,
    });

    return data;
  }
}

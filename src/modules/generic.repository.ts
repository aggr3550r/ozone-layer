import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../interfaces/database/IGenericRepository';

@Injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
  findById(id: string, withFields?: boolean): Promise<T> {
    throw new Error('Method not implemented.');
  }
  create(data: Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(criteria: Partial<T>, data: Partial<T>): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(criteria: Partial<T>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

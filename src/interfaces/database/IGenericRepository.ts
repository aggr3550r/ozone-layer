import { DeepPartial } from 'typeorm';

export interface IGenericRepository<T> {
  findById(id: string, withFields?: boolean): Promise<T>;
  create(data: DeepPartial<T>): Promise<T>;
  update(criteria: Partial<T>, data: Partial<T>): Promise<any>;
  delete(criteria: Partial<T>): Promise<void>;
}

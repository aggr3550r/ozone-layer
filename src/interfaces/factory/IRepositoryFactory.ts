import { IMakeRepositoryType } from './IMakeRepositoryType';

export interface IRepositoryFactory {
  makeRepository(input: IMakeRepositoryType): any;
}

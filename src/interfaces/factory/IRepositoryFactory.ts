import { RepositoryType } from '../../enums/repository-type.enum';

export interface IRepositoryFactory {
  makeRepository(repositoryType?: RepositoryType): any;
}

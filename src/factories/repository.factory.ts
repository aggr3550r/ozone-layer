import { MakeProviderDTO } from '../dtos/make-provider.dto';
import { RepositoryType } from '../enums/repository-type.enum';
import { IRepositoryFactory } from '../interfaces/factory/IRepositoryFactory';

export class RepositoryFactory implements IRepositoryFactory {
  public makeProvider(makeProvider: MakeProviderDTO) {
    throw new Error('Method not implemented.');
  }

  private resolveRepositoryByRepositoryType(type: RepositoryType) {}
}

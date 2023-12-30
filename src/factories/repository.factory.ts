import { NotImplementedException } from '@nestjs/common';
import { RepositoryType } from '../enums/repository-type.enum';
import { IRepositoryFactory } from '../interfaces/factory/IRepositoryFactory';
import { VerificationProviderRepository } from '../modules/verification-provider/data/verification-provider.repository';
import { VerificationServiceConfigRepository } from '../modules/verification-service/data/verification-service-config.repository';

export class RepositoryFactory implements IRepositoryFactory {
  constructor(
    private providerRepository: VerificationProviderRepository,
    private serviceConfigRepository: VerificationServiceConfigRepository,
  ) {}

  public makeRepository(repositoryType: RepositoryType) {
    return this.resolveRepositoryByRepositoryType(repositoryType);
  }

  private resolveRepositoryByRepositoryType(type: RepositoryType) {
    let repository: any;
    switch (type) {
      case RepositoryType.VERIFICATION_PROVIDER:
        repository = this.providerRepository;
        break;
      case RepositoryType.VERIFICATION_SERVICE_CONFIG:
        repository = this.serviceConfigRepository;
        break;

      default:
        throw new NotImplementedException(
          'Repository of such type does not exist.',
        );
        break;
    }
    return repository;
  }
}

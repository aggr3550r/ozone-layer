import { Injectable, NotImplementedException } from '@nestjs/common';
import { IRepositoryFactory } from '../interfaces/factory/IRepositoryFactory';
import { IVerificationProviderFactory } from '../interfaces/factory/IVerificationProviderFactory';
import { IVerificationServiceFactory } from '../interfaces/factory/IVerificationServiceFactory';
import { RepositoryType } from '../enums/repository-type.enum';
import { MakeProviderDTO } from '../dtos/make-provider.dto';
import { VerificationProviderRepository } from '../modules/verification-provider/data/verification-provider.repository';
import { VerificationServiceConfigRepository } from '../modules/verification-service/data/verification-service-config.repository';
import { YouVerify } from '../providers/youverify.provider';
import { Paystack } from '../providers/paystack.provider';
import { Trulioo } from '../providers/trulioo.provider';
import { Idenfy } from '../providers/idenfy.provider';
import { VerificationService } from '../modules/verification-service/services/verification.service';
import { VerificationType } from '../enums/verification-type.enum';

@Injectable()
export class ProviderFactory
  implements
    IRepositoryFactory,
    IVerificationProviderFactory,
    IVerificationServiceFactory
{
  constructor(
    private readonly providerRepository: VerificationProviderRepository,
    private readonly serviceConfigRepository: VerificationServiceConfigRepository,
    private readonly youVerify: YouVerify,
    private readonly paystack: Paystack,
    private readonly trulioo: Trulioo,
    private readonly idenfy: Idenfy,
    private readonly verificationService: VerificationService,
  ) {}

  public makeRepository(repositoryType?: RepositoryType) {
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

  public makeProvider(input: MakeProviderDTO): any {
    return this.resolveProviderByVerificationType(input);
  }

  private resolveProviderByVerificationType(input: MakeProviderDTO) {
    let provider: any;

    switch (input?.verificationType) {
      case VerificationType.BVN:
        provider = this.paystack;
        break;

      case VerificationType.NIN:
        provider = this.youVerify;
        break;

      case VerificationType.SSN:
        provider = this.trulioo;
        break;

      case VerificationType.DRIVERS_LICENSE:
        provider = this.youVerify;
        break;

      case VerificationType.FACE_ID:
        provider = this.idenfy;
        break;

      case VerificationType.INTL_PASSPORT:
        provider = this.idenfy;
        break;

      case VerificationType.PVC:
        provider = this.youVerify;
        break;

      default:
        throw new NotImplementedException(
          'Cannot resolve verification service provider by verification type.',
        );
        break;
    }
    return provider;
  }

  public makeService() {
    return this.verificationService;
  }
}

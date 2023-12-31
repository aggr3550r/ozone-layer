import { Injectable, NotImplementedException } from '@nestjs/common';
import { RepositoryType } from '../enums/repository-type.enum';
import { MakeProviderDTO } from '../dtos/make-provider.dto';
import { VerificationProviderRepository } from '../modules/verification-provider/data/verification-provider.repository';
import { VerificationServiceConfigRepository } from '../modules/verification-service-config/data/verification-service-config.repository';
import { YouVerify } from '../providers/youverify.provider';
import { Paystack } from '../providers/paystack.provider';
import { Trulioo } from '../providers/trulioo.provider';
import { Idenfy } from '../providers/idenfy.provider';
import { VerificationService } from '../modules/verification-service/services/verification.service';
import { VerificationType } from '../enums/verification-type.enum';
import { IMakeVerificationProviderType } from '../interfaces/factory/IMakeVerificationProviderType';
import { IMakeServiceType } from '../interfaces/factory/IMakeServiceType';
import { IMakeRepositoryType } from '../interfaces/factory/IMakeRepositoryType';
import { IRepositoryFactory } from '../interfaces/factory/IRepositoryFactory';
import { IVerificationProviderFactory } from '../interfaces/factory/IVerificationProviderFactory';
import { IVerificationServiceFactory } from '../interfaces/factory/IVerificationServiceFactory';
import { ServiceType } from '../enums/service-type.enum';
import { VerificationServiceConfigService } from '../modules/verification-service-config/services/verification-service-config.service';
import { VerificationProviderService } from '../modules/verification-provider/services/verification-provider.service';

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
    private readonly verificationServiceConfigService: VerificationServiceConfigService,
    private readonly verificationProviderService: VerificationProviderService,
  ) {}

  public makeRepository(input: IMakeRepositoryType) {
    return this.resolveRepositoryByRepositoryType(input?.repositoryType);
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

  public makeVerificationProvider(input: IMakeVerificationProviderType): any {
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

  public makeService(input: IMakeServiceType) {
    return this.resolveServiceByServiceType(input?.serviceType);
  }

  private resolveServiceByServiceType(type: ServiceType) {
    let response: any;
    switch (type) {
      case ServiceType.VERIFICATION_SERVICE_SERVICE:
        response = this.verificationService;
        break;

      case ServiceType.VERIFICATION_SERVICE_CONFIG_SERVICE:
        response = this.verificationServiceConfigService;
        break;

      case ServiceType.VERIFICATION_PROVIDER_SERVICE:
        response = this.verificationProviderService;
        break;

      default:
        throw new NotImplementedException(
          'Cannot resolve service by service type.',
        );
        break;
    }

    return response;
  }
}

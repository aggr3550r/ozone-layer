import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import {
  AllTheProviders,
  AllTheServices,
} from 'src/interfaces/AllTheProviders';
import { Provider } from '../enums/provider.enum';
import { RepositoryType } from '../enums/repository-type.enum';
import { ServiceType } from '../enums/service-type.enum';
import { VerificationType } from '../enums/verification-type.enum';
import { IMakeRepositoryType } from '../interfaces/factory/IMakeRepositoryType';
import { IMakeServiceType } from '../interfaces/factory/IMakeServiceType';
import { IMakeVerificationProviderType } from '../interfaces/factory/IMakeVerificationProviderType';
import { IRepositoryFactory } from '../interfaces/factory/IRepositoryFactory';
import { IVerificationProviderFactory } from '../interfaces/factory/IVerificationProviderFactory';
import { IVerificationServiceFactory } from '../interfaces/factory/IVerificationServiceFactory';
import { VerificationProviderRepository } from '../modules/verification-provider/data/verification-provider.repository';
import { VerificationProviderService } from '../modules/verification-provider/verification-provider.service';
import { VerificationServiceConfigRepository } from '../modules/verification-service-config/data/verification-service-config.repository';
import { VerificationServiceConfigService } from '../modules/verification-service-config/verification-service-config.service';
import { VerificationService } from '../modules/verification-service/verification.service';
import { IdenfyProvider } from '../providers/idenfy.provider';
import { PaystackProvider } from '../providers/paystack.provider';
import { TruliooProvider } from '../providers/trulioo.provider';
import { YouVerifyProvider } from '../providers/youverify.provider';

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
    private readonly youVerify: YouVerifyProvider,
    private readonly paystack: PaystackProvider,
    private readonly trulioo: TruliooProvider,
    private readonly idenfy: IdenfyProvider,
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

  public async makeVerificationProvider(input: IMakeVerificationProviderType) {
    const serviceConfig = (
      await this.verificationServiceConfigService.findServiceConfigByCriteria({
        verificationType: input?.verificationType,
        country: input?.country,
      })
    ).data;

    const providerId = serviceConfig?.provider;

    if (!providerId) {
      throw new NotFoundException(
        'Could not find a provider for that verification type.',
      );
    }

    const provider = (
      await this.verificationProviderService.getProviderById(providerId)
    ).data;

    return this.resolveProviderByProviderName(provider.name);
  }

  private resolveProviderByVerificationType(
    input: IMakeVerificationProviderType,
  ) {
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
          'Could not resolve verification service provider by verification type.',
        );
        break;
    }
    return provider;
  }

  private resolveProviderByProviderName(name: Provider) {
    let provider: AllTheProviders;

    switch (name) {
      case Provider.YOUVERIFY:
        provider = this.youVerify;
        break;

      case Provider.PAYSTACK:
        provider = this.paystack;
        break;

      case Provider.IDENFY:
        provider = this.idenfy;
        break;

      case Provider.TRULIOO:
        provider = this.trulioo;
        break;

      default:
        throw new NotImplementedException(
          'Could not resolve verification service provider by provider name.',
        );
    }

    return provider;
  }

  public makeService(input: IMakeServiceType) {
    return this.resolveServiceByServiceType(input?.serviceType);
  }

  private resolveServiceByServiceType(type: ServiceType) {
    let response: AllTheServices;

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
    }

    return response;
  }
}

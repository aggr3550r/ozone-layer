import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { YouVerifyProvider } from '../providers/youverify.provider';
import { TruliooProvider } from '../providers/trulioo.provider';
import { IdenfyProvider } from '../providers/idenfy.provider';
import { VerificationType } from '../enums/verification-type.enum';
import { IMakeVerificationProviderType } from '../interfaces/factory/IMakeVerificationProviderType';

import { IVerificationProviderFactory } from '../interfaces/factory/IVerificationProviderFactory';
import { VerificationServiceConfigService } from '../modules/verification-service-config/verification-service-config.service';
import { VerificationProviderService } from '../modules/verification-provider/verification-provider.service';
import { Provider } from '../enums/provider.enum';

@Injectable()
export class ProviderFactory implements IVerificationProviderFactory {
  constructor(
    private readonly youVerify: YouVerifyProvider,
    private readonly trulioo: TruliooProvider,
    private readonly idenfy: IdenfyProvider,
    private readonly verificationServiceConfigService: VerificationServiceConfigService,
    private readonly verificationProviderService: VerificationProviderService,
  ) {}

  public async makeVerificationProvider(
    input: IMakeVerificationProviderType,
  ): Promise<any> {
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
        provider = this.youVerify;
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
    let provider: unknown;
    switch (name) {
      case Provider.YOUVERIFY:
        provider = this.youVerify;
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
        break;
    }

    return provider;
  }
}

import { Injectable, NotImplementedException } from '@nestjs/common';
import { IVerificationProviderFactory } from '../interfaces/factory/IVerificationProviderFactory';
import { MakeProviderDTO } from '../dtos/make-provider.dto';
import { YouVerify } from '../providers/youverify.provider';
import { Paystack } from '../providers/paystack.provider';
import { Trulioo } from '../providers/trulioo.provider';
import { Idenfy } from '../providers/idenfy.provider';
import { VerificationType } from '../enums/verification-type.enum';

@Injectable()
export class VerificationProviderFactory
  implements IVerificationProviderFactory
{
  constructor(
    private readonly youVerify: YouVerify,
    private readonly paystack: Paystack,
    private readonly trulioo: Trulioo,
    private readonly idenfy: Idenfy,
  ) {}

  public makeProvider(input: MakeProviderDTO): any {
    const provider = this.resolveProviderByVerificationType(input);
    return provider;
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
}

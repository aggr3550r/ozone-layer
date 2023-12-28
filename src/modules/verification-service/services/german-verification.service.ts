import { Injectable, NotImplementedException } from '@nestjs/common';
import { GenericVerificationService } from '../generic-verification.service';
import { IGermanVerificationService } from '../../../interfaces/service/IGermanVerificationService';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';
import { VerificationProviderFactory } from '../../../factories/verification-provider.factory';
import { MakeProviderDTO } from '../../../dtos/make-provider.dto';
import { VerificationType } from '../../../enums/verification-type.enum';
import { ISsnVerificationProvider } from '../../../interfaces/provider/ISSNVerificationProvider';
import { IIntlPassportVerificationProvider } from '../../../interfaces/provider/IIntlPassportVerificationProvider';

@Injectable()
export class GermanVerificationService
  extends GenericVerificationService
  implements IGermanVerificationService
{
  constructor(
    private readonly verificationProviderFactory: VerificationProviderFactory,
  ) {
    super();
  }

  public async verifyDocument(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<any> {
    try {
      let response: any;

      switch (verifyDocumentDTO?.verificationType) {
        case VerificationType.SSN:
          response = await this.verifySsn(verifyDocumentDTO);
          break;

        case VerificationType.INTL_PASSPORT:
          response = await this.verifyIntlPassport(verifyDocumentDTO);
          break;

        default:
          throw new NotImplementedException(
            'German verification service cannot verify document of that type.',
          );
          break;
      }

      return response;
    } catch (error) {
      console.error(
        `GermanVerificationService :: verifyDocument() error ${error?.message}`,
      );
    }
  }

  private async verifySsn(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.SSN,
    };

    const provider: ISsnVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    return provider.verifySsn(verifyDocumentDTO);
  }

  private async verifyIntlPassport(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.SSN,
    };

    const provider: IIntlPassportVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    return provider.verifyIntlPassport(verifyDocumentDTO);
  }
}

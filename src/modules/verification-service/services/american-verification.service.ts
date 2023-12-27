import { Injectable, NotImplementedException } from '@nestjs/common';
import { IAmericanVerificationService } from '../../../interfaces/services/IAmericanVerificationService';
import { GenericVerificationService } from '../generic-verification.service';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';
import { VerificationProviderFactory } from '../../../factories/verification-provider.factory';
import { MakeProviderDTO } from '../../../dtos/make-provider.dto';
import { VerificationType } from '../../../enums/verification-type.enum';
import { ISsnVerificationProvider } from '../../../interfaces/providers/ISSNVerificationProvider';
import { IDriversLicenseVerificationProvider } from '../../../interfaces/providers/IDriversLicenseVerificationProvider';
import { IIntlPassportVerificationProvider } from '../../../interfaces/providers/IIntlPassportVerificationProvider';

@Injectable()
export class AmericanVerificationService
  extends GenericVerificationService
  implements IAmericanVerificationService
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

        case VerificationType.DRIVERS_LICENSE:
          response = await this.verifyDriversLicense(verifyDocumentDTO);
          break;

        case VerificationType.INTL_PASSPORT:
          response = await this.verifyIntlPassport(verifyDocumentDTO);
          break;

        default:
          throw new NotImplementedException(
            'American verification service cannot verify document of that type.',
          );
          break;
      }
    } catch (error) {
      console.error(
        `AmericanVerificationService :: verifyDocument() error ${error.message}`,
      );
    }
  }

  private async verifySsn(verifyDocumentDTO: VerifyDocumentDTO) {
    /**
     * There is no apparent harm in hardcoding country here as it is specifically stated by the service but we might implement verification services to serve other countries where in the verification types required coincide fittingly enough in which case this design choice will allow us to easily extend this service to the new one without changes without necessitating a change this here service.
     *
     * In fact we could easily alter the design at this layer to serve users based on their content if we come to be certain that required verification types do not get specific at the national level which is very unlikely.
     **
     */
    const input: MakeProviderDTO = {
      verificationType: VerificationType.SSN,
      country: verifyDocumentDTO.country,
    };

    const provider: ISsnVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    return provider.verifySsn(verifyDocumentDTO);
  }

  private async verifyDriversLicense(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.DRIVERS_LICENSE,
      country: verifyDocumentDTO.country,
    };

    const provider: IDriversLicenseVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    return provider.verifyDriversLicense(verifyDocumentDTO);
  }

  private async verifyIntlPassport(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.INTL_PASSPORT,
      country: verifyDocumentDTO.country,
    };

    const provider: IIntlPassportVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    return provider.verifyIntlPassport(verifyDocumentDTO);
  }
}

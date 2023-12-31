import {
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';
import { VerificationType } from '../../../enums/verification-type.enum';
import { IBvnVerificationProvider } from '../../../interfaces/provider/IBVNVerifcationProvider';
import { INinVerificationProvider } from '../../../interfaces/provider/ININVerificationProvider';
import { IPvcVerificationProvider } from '../../../interfaces/provider/IPVCVerificationProvider';
import { IDriversLicenseVerificationProvider } from '../../../interfaces/provider/IDriversLicenseVerificationProvider';
import { ISsnVerificationProvider } from '../../../interfaces/provider/ISSNVerificationProvider';
import { IIntlPassportVerificationProvider } from '../../../interfaces/provider/IIntlPassportVerificationProvider';
import { IVerificationService } from '../../../interfaces/service/IVerificationService';
import { ProviderFactory } from '../../../factories/provider.factory';
import { IMakeVerificationProviderType } from '../../../interfaces/factory/IMakeVerificationProviderType';
import { VerificationServiceResponse } from '../../../models/verification-service-response.model';

@Injectable()
export class VerificationService implements IVerificationService {
  constructor(private readonly verificationProviderFactory: ProviderFactory) {}

  public async verifyDocument(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<VerificationServiceResponse<any>> {
    try {
      let response: any;

      switch (verifyDocumentDTO?.verificationType) {
        case VerificationType.BVN:
          response = await this.verifyBvn(verifyDocumentDTO);
          break;

        case VerificationType.NIN:
          response = await this.verifyNin(verifyDocumentDTO);

        case VerificationType.PVC:
          response = await this.verifyPvc(verifyDocumentDTO);

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
            'Cannot verify document of that type.',
          );
          break;
      }

      return new VerificationServiceResponse(
        HttpStatus.OK,
        `Successfully verified ${verifyDocumentDTO?.verificationType}.`,
        response,
      );
    } catch (error) {
      console.error(
        `VerificationService :: verifyDocument() error ${error.message}`,
      );
    }
  }

  private async verifyBvn(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.BVN,
      country: verifyDocumentDTO?.country,
    };

    const provider: IBvnVerificationProvider =
      this.verificationProviderFactory.makeVerificationProvider(input);

    const verificationResponse = provider.verifyBvn(verifyDocumentDTO);
    return verificationResponse;
  }

  private async verifyNin(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.NIN,
      country: verifyDocumentDTO?.country,
    };

    const provider: INinVerificationProvider =
      this.verificationProviderFactory.makeVerificationProvider(input);

    const verificationResponse = provider.verifyNin(verifyDocumentDTO);
    return verificationResponse;
  }

  private async verifyPvc(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.PVC,
      country: verifyDocumentDTO?.country,
    };

    const provider: IPvcVerificationProvider =
      this.verificationProviderFactory.makeVerificationProvider(input);

    const verificationResponse = provider.verifyPvc(verifyDocumentDTO);
    return verificationResponse;
  }

  private async verifyDriversLicense(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.DRIVERS_LICENSE,
      country: verifyDocumentDTO?.country,
    };

    const provider: IDriversLicenseVerificationProvider =
      this.verificationProviderFactory.makeVerificationProvider(input);

    const verificationResponse =
      provider.verifyDriversLicense(verifyDocumentDTO);

    return verificationResponse;
  }

  private async verifySsn(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.SSN,
      country: verifyDocumentDTO?.country,
    };

    const provider: ISsnVerificationProvider =
      this.verificationProviderFactory.makeVerificationProvider(input);

    return provider.verifySsn(verifyDocumentDTO);
  }

  private async verifyIntlPassport(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.INTL_PASSPORT,
    };

    const provider: IIntlPassportVerificationProvider =
      this.verificationProviderFactory.makeVerificationProvider(input);

    return provider.verifyIntlPassport(verifyDocumentDTO);
  }
}

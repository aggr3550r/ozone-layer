import {
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { TruliooProvider } from 'src/providers/trulioo.provider';
import { YouVerifyProvider } from 'src/providers/youverify.provider';
import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { VerificationType } from '../../enums/verification-type.enum';
import { ProviderFactory } from '../../factories/provider.factory';
import { IMakeVerificationProviderType } from '../../interfaces/factory/IMakeVerificationProviderType';
import { IDriversLicenseVerificationProvider } from '../../interfaces/provider/IDriversLicenseVerificationProvider';
import { IIntlPassportVerificationProvider } from '../../interfaces/provider/IIntlPassportVerificationProvider';
import { INinVerificationProvider } from '../../interfaces/provider/ININVerificationProvider';
import { ISsnVerificationProvider } from '../../interfaces/provider/ISSNVerificationProvider';
import { IVerificationService } from '../../interfaces/service/IVerificationService';
import { VerificationServiceResponse } from '../../models/verification-service-response.model';

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

    const provider =
      (await this.verificationProviderFactory.makeVerificationProvider(
        input,
      )) as YouVerifyProvider;

    return await provider.verifyBvn(verifyDocumentDTO);
  }

  private async verifyNin(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.NIN,
      country: verifyDocumentDTO?.country,
    };

    const provider: INinVerificationProvider =
      (await this.verificationProviderFactory.makeVerificationProvider(
        input,
      )) as YouVerifyProvider;

    return await provider.verifyNin(verifyDocumentDTO);
  }

  private async verifyPvc(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.PVC,
      country: verifyDocumentDTO?.country,
    };

    const provider =
      (await this.verificationProviderFactory.makeVerificationProvider(
        input,
      )) as YouVerifyProvider;

    return await provider.verifyPvc(verifyDocumentDTO);
  }

  private async verifyDriversLicense(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.DRIVERS_LICENSE,
      country: verifyDocumentDTO?.country,
    };

    const provider: IDriversLicenseVerificationProvider =
      (await this.verificationProviderFactory.makeVerificationProvider(
        input,
      )) as YouVerifyProvider;

    return await provider.verifyDriversLicense(verifyDocumentDTO);
  }

  private async verifySsn(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.SSN,
      country: verifyDocumentDTO?.country,
    };

    const provider: ISsnVerificationProvider =
      (await this.verificationProviderFactory.makeVerificationProvider(
        input,
      )) as TruliooProvider;

    return await provider.verifySsn(verifyDocumentDTO);
  }

  private async verifyIntlPassport(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: IMakeVerificationProviderType = {
      verificationType: VerificationType.INTL_PASSPORT,
      country: verifyDocumentDTO?.country,
    };

    const provider: IIntlPassportVerificationProvider =
      (await this.verificationProviderFactory.makeVerificationProvider(
        input,
      )) as TruliooProvider;

    return await provider.verifyIntlPassport(verifyDocumentDTO);
  }
}

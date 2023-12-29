import { Injectable } from '@nestjs/common';
import { INigerianVerificationService } from '../../../interfaces/service/INigerianVerificationService';
import { GenericVerificationService } from '../generic-verification.service';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';
import { VerificationType } from '../../../enums/verification-type.enum';
import { VerificationProviderFactory } from '../../../factories/verification-provider.factory';
import { MakeProviderDTO } from '../../../dtos/make-provider.dto';
import { IBvnVerificationProvider } from '../../../interfaces/provider/IBVNVerifcationProvider';
import { INinVerificationProvider } from '../../../interfaces/provider/ININVerificationProvider';
import { IPvcVerificationProvider } from '../../../interfaces/provider/IPVCVerificationProvider';
import { IDriversLicenseVerificationProvider } from '../../../interfaces/provider/IDriversLicenseVerificationProvider';

@Injectable()
export class NigerianVerificationService
  extends GenericVerificationService
  implements INigerianVerificationService
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
        case VerificationType.BVN:
          response = await this.verifyBvn(verifyDocumentDTO);
          break;

        case VerificationType.NIN:
          response = await this.verifyNin(verifyDocumentDTO);
          break;

        case VerificationType.PVC:
          response = await this.verifyPvc(verifyDocumentDTO);
          break;

        case VerificationType.DRIVERS_LICENSE:
          response = await this.verifyDriversLicense(verifyDocumentDTO);
          break;

        default:
          break;
      }

      return response;
    } catch (error) {
      console.error(
        `NigerianVerificationService :: verifyDocument() error ${error?.message}`,
      );
    }
  }

  private async verifyBvn(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.BVN,
    };
    const provider: IBvnVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    const verificationResponse = provider.verifyBvn(verifyDocumentDTO);
    return verificationResponse;
  }

  private verifyNin(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.NIN,
    };

    const provider: INinVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    const verificationResponse = provider.verifyNin(verifyDocumentDTO);
    return verificationResponse;
  }

  private verifyPvc(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.PVC,
    };

    const provider: IPvcVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    const verificationResponse = provider.verifyPvc(verifyDocumentDTO);
    return verificationResponse;
  }

  private verifyDriversLicense(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.DRIVERS_LICENSE,
    };

    const provider: IDriversLicenseVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    const verificationResponse =
      provider.verifyDriversLicense(verifyDocumentDTO);

    return verificationResponse;
  }
}

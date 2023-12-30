import { Injectable, NotImplementedException } from '@nestjs/common';
import { RepositoryType } from '../../../enums/repository-type.enum';
import { IVerificationServiceConfigRepository } from '../../../interfaces/database/IVerificationServiceConfigRepository';
import { VerificationServiceConfig } from '../data/verification-service-config.entity';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';
import { MakeProviderDTO } from '../../../dtos/make-provider.dto';
import { VerificationType } from '../../../enums/verification-type.enum';
import { IBvnVerificationProvider } from '../../../interfaces/provider/IBVNVerifcationProvider';
import { INinVerificationProvider } from '../../../interfaces/provider/ININVerificationProvider';
import { IPvcVerificationProvider } from '../../../interfaces/provider/IPVCVerificationProvider';
import { IDriversLicenseVerificationProvider } from '../../../interfaces/provider/IDriversLicenseVerificationProvider';
import { Country } from '../../../enums/country.enum';
import { ISsnVerificationProvider } from '../../../interfaces/provider/ISSNVerificationProvider';
import { IIntlPassportVerificationProvider } from '../../../interfaces/provider/IIntlPassportVerificationProvider';
import { IVerificationService } from '../../../interfaces/service/IVerificationService';
import { IRepositoryFactory } from '../../../interfaces/factory/IRepositoryFactory';
import { IVerificationProviderFactory } from '../../../interfaces/factory/IVerificationProviderFactory';

@Injectable()
export class VerificationService implements IVerificationService {
  constructor(
    private readonly repositoryFactory: IRepositoryFactory,
    private readonly verificationProviderFactory: IVerificationProviderFactory,
    private readonly verificationServiceConfigRepository: IVerificationServiceConfigRepository<VerificationServiceConfig>,
  ) {
    this.verificationServiceConfigRepository =
      this.repositoryFactory.makeRepository(
        RepositoryType.VERIFICATION_SERVICE_CONFIG,
      );
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

      return response;
    } catch (error) {
      console.error(
        `VerificationService :: verifyDocument() error ${error.message}`,
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

  private async verifyNin(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.NIN,
    };

    const provider: INinVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    const verificationResponse = provider.verifyNin(verifyDocumentDTO);
    return verificationResponse;
  }

  private async verifyPvc(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.PVC,
    };

    const provider: IPvcVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    const verificationResponse = provider.verifyPvc(verifyDocumentDTO);
    return verificationResponse;
  }

  private async verifyDriversLicense(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.DRIVERS_LICENSE,
    };

    const provider: IDriversLicenseVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    const verificationResponse =
      provider.verifyDriversLicense(verifyDocumentDTO);

    return verificationResponse;
  }

  private async verifySsn(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.SSN,
      country: Country.GERMANY,
    };

    const provider: ISsnVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    return provider.verifySsn(verifyDocumentDTO);
  }

  private async verifyIntlPassport(verifyDocumentDTO: VerifyDocumentDTO) {
    const input: MakeProviderDTO = {
      verificationType: VerificationType.INTL_PASSPORT,
      country: Country.GERMANY,
    };

    const provider: IIntlPassportVerificationProvider =
      this.verificationProviderFactory.makeProvider(input);

    return provider.verifyIntlPassport(verifyDocumentDTO);
  }
}

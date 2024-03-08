import { VerifyDocumentDTO, VerifyDriversLicenseDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface IDriversLicenseVerificationProvider {
  verifyDriversLicense(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyDriversLicenseDTO>,
  ): Promise<VerificationProviderResponse<any>>;
}

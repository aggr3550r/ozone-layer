import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { VerificationProviderResponse } from '../../models/verification-provider.response.model';

export interface IDriversLicenseVerificationProvider {
  verifyDriversLicense(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<VerificationProviderResponse<any>>;
}

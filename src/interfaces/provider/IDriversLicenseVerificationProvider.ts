import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface IDriversLicenseVerificationProvider {
  verifyDriversLicense(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

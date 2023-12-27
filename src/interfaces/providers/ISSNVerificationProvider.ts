import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface ISsnVerificationProvider {
  verifySsn(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

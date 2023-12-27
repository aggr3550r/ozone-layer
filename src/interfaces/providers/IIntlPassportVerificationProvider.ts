import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface IIntlPassportVerificationProvider {
  verifyIntlPassport(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

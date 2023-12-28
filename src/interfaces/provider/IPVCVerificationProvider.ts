import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface IPvcVerificationProvider {
  verifyPvc(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

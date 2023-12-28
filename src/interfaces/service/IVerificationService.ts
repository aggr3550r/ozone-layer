import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface IVerificationService {
  verifyDocument(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

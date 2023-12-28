import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface IBvnVerificationProvider {
  verifyBvn(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

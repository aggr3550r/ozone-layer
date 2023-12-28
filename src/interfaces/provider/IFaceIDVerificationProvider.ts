import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface IFaceIDVerificationProvider {
  verifyFaceID(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

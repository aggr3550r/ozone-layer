import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';

export interface INinVerificationProvider {
  verifyNin(verifyDocument: VerifyDocumentDTO): Promise<any>;
}

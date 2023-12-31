import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { VerificationServiceResponse } from '../../models/verification-service-response.model';

export interface IVerificationService {
  verifyDocument(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<VerificationServiceResponse<any>>;
}

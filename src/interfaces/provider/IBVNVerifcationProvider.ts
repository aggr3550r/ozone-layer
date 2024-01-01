import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { VerificationProviderResponse } from '../../models/verification-provider.response.model';

export interface IBvnVerificationProvider {
  verifyBvn(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<VerificationProviderResponse<any>>;
}

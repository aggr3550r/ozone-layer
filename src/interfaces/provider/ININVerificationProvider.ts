import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { VerificationProviderResponse } from '../../models/verification-provider.response.model';

export interface INinVerificationProvider {
  verifyNin(
    verifyDocument: VerifyDocumentDTO,
  ): Promise<VerificationProviderResponse<any>>;
}

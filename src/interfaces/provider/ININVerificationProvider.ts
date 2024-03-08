import { VerifyDocumentDTO, VerifyNinDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface INinVerificationProvider {
  verifyNin(
    verifyDocument: VerifyDocumentDTO<VerifyNinDTO>,
  ): Promise<VerificationProviderResponse<any>>;
}

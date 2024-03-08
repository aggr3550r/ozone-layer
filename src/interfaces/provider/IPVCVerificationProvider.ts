import { VerifyDocumentDTO, VerifyPvcDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface IPvcVerificationProvider {
  verifyPvc(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyPvcDTO>,
  ): Promise<VerificationProviderResponse<any>>;
}

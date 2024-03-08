import { VerifyDocumentDTO, VerifyNinDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface IPvcVerificationProvider {
  verifyPvc(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyNinDTO>,
  ): Promise<VerificationProviderResponse<any>>;
}

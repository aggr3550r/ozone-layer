import { VerifyBvnDTO, VerifyDocumentDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface IBvnVerificationProvider {
  verifyBvn(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyBvnDTO>,
  ): Promise<VerificationProviderResponse<any>>;
}

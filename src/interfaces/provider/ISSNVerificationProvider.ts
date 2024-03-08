import { VerifyDocumentDTO, VerifySsnDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface ISsnVerificationProvider {
  verifySsn(
    verifyDocumentDTO: VerifyDocumentDTO<VerifySsnDTO>,
  ): Promise<VerificationProviderResponse<any>>;
}

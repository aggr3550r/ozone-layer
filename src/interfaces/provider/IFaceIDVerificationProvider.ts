import { VerifyDocumentDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface IFaceIDVerificationProvider {
  verifyFaceID(
    verifyDocumentDTO: VerifyDocumentDTO<any>,
  ): Promise<VerificationProviderResponse<any>>;
}

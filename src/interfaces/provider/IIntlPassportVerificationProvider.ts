import { VerifyDocumentDTO, VerifyIntlPassportDTO } from '../../dtos';
import { VerificationProviderResponse } from '../../models';

export interface IIntlPassportVerificationProvider {
  verifyIntlPassport(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyIntlPassportDTO>,
  ): Promise<VerificationProviderResponse<any>>;
}

import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { IGenericService } from './IGenericService';

export interface IVerificationService extends IGenericService {
  verifyDocument(verifyDocumentDTO: VerifyDocumentDTO): Promise<any>;
}

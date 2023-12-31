import {
  CreateVerificationProviderDTO,
  FindProviderByCriteriaDTO,
  UpdateVerificationProviderDTO,
  VerificationProviderDTO,
} from '../../dtos/verification-provider.dto';
import { ResponseModel } from '../../models/response.model';

export interface IVerificationProviderService {
  createProvider(
    input: CreateVerificationProviderDTO,
  ): Promise<ResponseModel<VerificationProviderDTO>>;

  updateProvider(
    criteria: FindProviderByCriteriaDTO,
    updates: UpdateVerificationProviderDTO,
  ): Promise<ResponseModel<VerificationProviderDTO>>;

  getProviderById(id: string): Promise<ResponseModel<VerificationProviderDTO>>;
}

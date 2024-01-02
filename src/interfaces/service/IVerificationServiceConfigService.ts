import {
  CreateVerificationServiceConfigDTO,
  FindServiceConfigByCriteriaDTO,
  UpdateVerificationServiceConfigDTO,
  VerificationServiceConfigDTO,
} from '../../dtos/verification-service-config.dto';
import { ResponseModel } from '../../models/response.model';

export interface IVerificationServiceConfigService {
  createServiceConfig(
    input: CreateVerificationServiceConfigDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>>;

  updateServiceConfig(
    criteria: FindServiceConfigByCriteriaDTO,
    update: UpdateVerificationServiceConfigDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>>;

  findServiceConfigByCriteria(
    criteria: FindServiceConfigByCriteriaDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>>;
}

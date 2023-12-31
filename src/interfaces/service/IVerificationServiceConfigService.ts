import { FindProviderByCriteriaDTO } from '../../dtos/verification-provider.dto';
import {
  CreateVerificationServiceConfigDTO,
  UpdateVerificationServiceConfigDTO,
  VerificationServiceConfigDTO,
} from '../../dtos/verification-service-config.dto';
import { VerificationType } from '../../enums/verification-type.enum';
import { ResponseModel } from '../../models/response.model';

export interface IVerificationServiceConfigService {
  createServiceConfig(
    input: CreateVerificationServiceConfigDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>>;

  findServiceConfigByVerificationType(
    input: VerificationType,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>>;

  updateServiceConfig(
    criteria: FindProviderByCriteriaDTO,
    update: UpdateVerificationServiceConfigDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>>;
}

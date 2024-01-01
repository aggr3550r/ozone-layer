import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IVerificationServiceConfigRepository } from '../../../interfaces/database/IVerificationServiceConfigRepository';
import { VerificationServiceConfig } from '../data/verification-service-config.entity';
import { RepositoryType } from '../../../enums/repository-type.enum';
import {
  CreateVerificationServiceConfigDTO,
  FindServiceConfigByCriteriaDTO,
  UpdateVerificationServiceConfigDTO,
  VerificationServiceConfigDTO,
} from '../../../dtos/verification-service-config.dto';
import { ResponseModel } from '../../../models/response.model';
import { VerificationType } from '../../../enums/verification-type.enum';
import { IVerificationServiceConfigService } from '../../../interfaces/service/IVerificationServiceConfigService';
import { IMakeRepositoryType } from '../../../interfaces/factory/IMakeRepositoryType';
import { ProviderFactory } from '../../../factories/provider.factory';

@Injectable()
export class VerificationServiceConfigService
  implements IVerificationServiceConfigService
{
  constructor(
    private readonly factory: ProviderFactory,
    private readonly verificationServiceConfigRepository: IVerificationServiceConfigRepository<VerificationServiceConfig>,
  ) {
    this.verificationServiceConfigRepository = this.factory.makeRepository({
      repositoryType: RepositoryType.VERIFICATION_SERVICE_CONFIG,
    } as IMakeRepositoryType);
  }

  public async createServiceConfig(
    createVerificationServiceConfigDTO: CreateVerificationServiceConfigDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>> {
    try {
      const newConfig = await this.verificationServiceConfigRepository.create(
        createVerificationServiceConfigDTO,
      );

      return new ResponseModel(
        HttpStatus.CREATED,
        'Successfully created new service config.',
        newConfig,
      );
    } catch (error) {
      return new ResponseModel(
        error?.status || HttpStatus.BAD_REQUEST,
        error.message || 'Operation failed.',
        null,
      );
    }
  }
  public async findServiceConfigByVerificationType(
    verificationType: VerificationType,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>> {
    try {
      const configExists =
        await this.verificationServiceConfigRepository.findByCriteria({
          verificationType,
        });

      if (!configExists) {
        throw new NotFoundException(
          `Could not find an active service config of type ${verificationType}.`,
        );
      }

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully retrieved verification service config.',
        configExists,
      );
    } catch (error) {
      console.error(
        'VerificationServiceConfigService :: findServiceConfigByVerificationType() error \n %o',
        error,
      );

      return new ResponseModel(
        error?.status || HttpStatus.BAD_REQUEST,
        error.message || 'Operation failed.',
        null,
      );
    }
  }

  public async updateServiceConfig(
    criteria: FindServiceConfigByCriteriaDTO,
    updateServiceConfigDTO: UpdateVerificationServiceConfigDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>> {
    try {
      const configExists =
        await this.verificationServiceConfigRepository.findByCriteria(criteria);

      if (!configExists) {
        throw new NotFoundException('Could not find config.');
      }

      await this.verificationServiceConfigRepository.update(
        criteria,
        updateServiceConfigDTO,
      );

      / Technically, we can construct the update response we expect or at least a reasonable response based on what we are given as updates if we simply merge the updates into the config object originally retrieved at runtime. This saves us some extra querying while still allowing us to return to the user some useful data on their update./;
      const updateResponse = Object.assign(
        configExists,
        updateServiceConfigDTO,
      );

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully updated service config.',
        updateResponse,
      );
    } catch (error) {
      console.error(
        'VerificationServiceConfigService :: updateServiceConfig() error \n %o',
        error,
      );

      return new ResponseModel(
        error?.status || HttpStatus.BAD_REQUEST,
        error.message || 'Operation failed.',
        null,
      );
    }
  }
}

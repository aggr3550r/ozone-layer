import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateVerificationServiceConfigDTO,
  FindServiceConfigByCriteriaDTO,
  UpdateVerificationServiceConfigDTO,
  VerificationServiceConfigDTO,
} from '../../dtos/verification-service-config.dto';
import { ResponseModel } from '../../models/response.model';
import { VerificationType } from '../../enums/verification-type.enum';
import { IVerificationServiceConfigService } from '../../interfaces/service/IVerificationServiceConfigService';

import { VerificationServiceConfigRepository } from './data/verification-service-config.repository';

@Injectable()
export class VerificationServiceConfigService
  implements IVerificationServiceConfigService
{
  constructor(
    private readonly verificationServiceConfigRepository: VerificationServiceConfigRepository,
  ) {}

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
  private async findServiceConfigByVerificationType(
    verificationType: VerificationType,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>> {
    try {
      const configExists =
        await this.verificationServiceConfigRepository.findOne({
          where: {
            verificationType,
          },
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
        await this.verificationServiceConfigRepository.findOne({
          where: {
            ...criteria,
          },
        });

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

  public async findServiceConfigByCriteria(
    criteria: FindServiceConfigByCriteriaDTO,
  ): Promise<ResponseModel<VerificationServiceConfigDTO>> {
    try {
      const serviceConfig =
        await this.verificationServiceConfigRepository.findOne({
          where: {
            ...criteria,
          },
        });

      if (!serviceConfig) {
        throw new NotFoundException(`Could not find service config.`);
      }

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully retrieved service config.',
        serviceConfig,
      );
    } catch (error) {
      console.error(
        'VerificationServiceConfigService :: findServiceConfigByCriteria() error \n %o',
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

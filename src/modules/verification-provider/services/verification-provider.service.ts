import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateVerificationProviderDTO,
  FindProviderByCriteriaDTO,
  UpdateVerificationProviderDTO,
  VerificationProviderDTO,
} from '../../../dtos/verification-provider.dto';
import { IVerificationProviderRepository } from '../../../interfaces/database/IVerificationProviderRepository';
import { VerificationProvider } from '../data/verification-provider.entity';
import { RepositoryType } from '../../../enums/repository-type.enum';
import { IMakeRepositoryType } from '../../../interfaces/factory/IMakeRepositoryType';
import { ProviderFactory } from '../../../factories/provider.factory';
import { ResponseModel } from '../../../models/response.model';
import { IVerificationProviderService } from '../../../interfaces/service/IVerificationProviderService';

@Injectable()
export class VerificationProviderService
  implements IVerificationProviderService
{
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly verificationProviderRepository: IVerificationProviderRepository<VerificationProvider>,
  ) {
    this.verificationProviderRepository = this.providerFactory.makeRepository({
      repositoryType: RepositoryType.VERIFICATION_PROVIDER,
    } as IMakeRepositoryType);
  }

  public async createProvider(
    createProviderDTO: CreateVerificationProviderDTO,
  ): Promise<ResponseModel<VerificationProviderDTO>> {
    try {
      const response = await this.verificationProviderRepository.create(
        createProviderDTO,
      );

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully created provider.',
        response,
      );
    } catch (error) {
      console.error(
        'VerificationProviderService :: createProvider() error',
        error,
      );

      return new ResponseModel(
        error.status || HttpStatus.BAD_REQUEST,
        error.message || 'Operation Failed.',
        null,
      );
    }
  }

  public async updateProvider(
    criteria: FindProviderByCriteriaDTO,
    updates: UpdateVerificationProviderDTO,
  ): Promise<ResponseModel<VerificationProviderDTO>> {
    try {
      const providerExists =
        await this.verificationProviderRepository.findByCriteria(criteria);

      if (!providerExists) {
        throw new NotFoundException(
          'Could not find an active provider by that criteria.',
        );
      }

      await this.verificationProviderRepository.update(criteria, updates);

      console.info(
        '*** successfully updated provider *** \n %o',
        providerExists,
      );

      const updateResponse = Object.assign(providerExists, updates);

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully updated provider.',
        updateResponse,
      );
    } catch (error) {
      console.error(
        'VerificationProviderService :: updateProvider() error',
        error,
      );

      return new ResponseModel(
        error.statusCode || HttpStatus.BAD_REQUEST,
        'An error occurred while updating provider.',
        null,
      );
    }
  }

  public async getProviderById(
    providerId: string,
  ): Promise<ResponseModel<VerificationProviderDTO>> {
    try {
      const provider = await this.verificationProviderRepository.findById(
        providerId,
      );

      if (!provider) throw new NotFoundException('Could not find provider.');

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully retrieved provider.',
        provider,
      );
    } catch (error) {
      console.error(
        'VerificationProviderService :: getProviderById() error',
        error,
      );

      return new ResponseModel(
        error.statusCode || HttpStatus.BAD_REQUEST,
        'An error occurred while retrieving provider.',
        null,
      );
    }
  }
}

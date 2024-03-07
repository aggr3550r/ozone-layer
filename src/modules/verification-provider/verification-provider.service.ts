import {
  CreateVerificationProviderDTO,
  FindProviderByCriteriaDTO,
  UpdateVerificationProviderDTO,
  VerificationProviderDTO,
} from '../../dtos/verification-provider.dto';
import { ResponseModel } from '../../models/response.model';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { VerificationProviderRepository } from './data/verification-provider.repository';

@Injectable()
export class VerificationProviderService {
  constructor(
    private readonly verificationProviderRepository: VerificationProviderRepository,
  ) {}

  public async createProvider(
    createProviderDTO: CreateVerificationProviderDTO,
  ): Promise<ResponseModel<VerificationProviderDTO>> {
    try {
      const response =
        this.verificationProviderRepository.create(createProviderDTO);

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
      const providerExists = await this.verificationProviderRepository.findOne({
        where: {
          ...criteria,
        },
      });

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
      const provider = await this.verificationProviderRepository.findOne({
        where: {
          id: providerId,
        },
      });

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

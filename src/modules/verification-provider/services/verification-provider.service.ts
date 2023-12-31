import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateVerificationProviderDTO,
  FindProviderByCriteriaDTO,
  UpdateVerificationProviderDTO,
} from '../../../dtos/verification-provider.dto';
import { IVerificationProviderRepository } from '../../../interfaces/database/IVerificationProviderRepository';
import { VerificationProvider } from '../data/verification-provider.entity';
import { RepositoryType } from '../../../enums/repository-type.enum';
import { AppError } from '../../../exceptions/app.error';
import { IMakeRepositoryType } from '../../../interfaces/factory/IMakeRepositoryType';
import { ProviderFactory } from '../../../factories/provider.factory';

@Injectable()
export class VerificationProviderService {
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
  ) {
    try {
      return await this.verificationProviderRepository.create(
        createProviderDTO,
      );
    } catch (error) {
      console.error(
        'VerificationProviderService :: createProvider() error',
        error,
      );

      throw new AppError(
        error?.message || 'Operation Failed.',
        error?.statusCode || 400,
      );
    }
  }

  public async updateProvider(
    criteria: FindProviderByCriteriaDTO,
    updates: UpdateVerificationProviderDTO,
  ) {
    try {
      const providerExists =
        await this.verificationProviderRepository.findByCriteria(criteria);

      if (!providerExists) {
        throw new NotFoundException(
          'Could not find an active provider by that criteria.',
        );
      }

      return await this.verificationProviderRepository.update(
        criteria,
        updates,
      );
    } catch (error) {
      console.error(
        'VerificationProviderService :: updateProvider() error',
        error,
      );

      throw new AppError(
        error?.message || 'Operation Failed.',
        error?.statusCode || 400,
      );
    }
  }

  public async getProviderById(providerId: string) {
    try {
      const provider = await this.verificationProviderRepository.findById(
        providerId,
      );

      if (!provider) throw new NotFoundException('Could not find provider.');

      return provider;
    } catch (error) {
      console.error(
        'VerificationProviderService :: getProviderById() error',
        error,
      );

      throw new AppError(
        error?.message || 'Operation Failed.',
        error?.statusCode || 400,
      );
    }
  }
}

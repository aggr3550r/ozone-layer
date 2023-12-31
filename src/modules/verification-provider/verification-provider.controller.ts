import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProviderFactory } from '../../factories/provider.factory';
import { IVerificationProviderService } from '../../interfaces/service/IVerificationProviderService';
import { IMakeServiceType } from '../../interfaces/factory/IMakeServiceType';
import { ServiceType } from '../../enums/service-type.enum';
import {
  CreateVerificationProviderDTO,
  FindProviderByCriteriaDTO,
  UpdateVerificationProviderDTO,
} from '../../dtos/verification-provider.dto';

@Controller('verification-provider')
export class VerificationProviderController {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly verificationProviderService: IVerificationProviderService,
  ) {
    this.verificationProviderService = this.providerFactory.makeService({
      serviceType: ServiceType.VERIFICATION_PROVIDER_SERVICE,
    } as IMakeServiceType);
  }

  @Post('')
  async createProvider(@Body() payload: CreateVerificationProviderDTO) {
    return await this.verificationProviderService.createProvider(payload);
  }

  @Patch('')
  async updateProvider(
    @Query() query: FindProviderByCriteriaDTO,
    @Body() body: UpdateVerificationProviderDTO,
  ) {
    return await this.verificationProviderService.updateProvider(query, body);
  }

  @Get('/:id')
  async getProviderById(@Param('id') id: string) {
    return await this.verificationProviderService.getProviderById(id);
  }
}

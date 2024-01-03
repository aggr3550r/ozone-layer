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
import { IVerificationServiceConfigService } from '../../interfaces/service/IVerificationServiceConfigService';
import { IMakeServiceType } from '../../interfaces/factory/IMakeServiceType';
import { ServiceType } from '../../enums/service-type.enum';
import {
  CreateVerificationServiceConfigDTO,
  FindServiceConfigByCriteriaDTO,
  UpdateVerificationServiceConfigDTO,
} from '../../dtos/verification-service-config.dto';
import { VerificationType } from '../../enums/verification-type.enum';

@Controller('service-config')
export class VerificationServiceConfigController {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly verificationServiceConfigService: IVerificationServiceConfigService,
  ) {
    this.verificationServiceConfigService = this.providerFactory.makeService({
      serviceType: ServiceType.VERIFICATION_SERVICE_CONFIG_SERVICE,
    } as IMakeServiceType);
  }

  @Post('')
  async createServiceConfig(@Body() body: CreateVerificationServiceConfigDTO) {
    return await this.verificationServiceConfigService.createServiceConfig(
      body,
    );
  }

  @Patch('')
  async updateServiceConfig(
    @Query() query: FindServiceConfigByCriteriaDTO,
    @Body() body: UpdateVerificationServiceConfigDTO,
  ) {
    return await this.verificationServiceConfigService.updateServiceConfig(
      query,
      body,
    );
  }

  @Get('/:verificationType')
  async findServiceConfigByVerificationType(
    @Param('verificationType') verificationType: VerificationType,
  ) {
    return await this.verificationServiceConfigService.findServiceConfigByCriteria(
      { verificationType },
    );
  }
}

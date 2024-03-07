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
import {
  CreateVerificationProviderDTO,
  FindProviderByCriteriaDTO,
  UpdateVerificationProviderDTO,
} from '../../dtos/verification-provider.dto';
import { VerificationProviderService } from './verification-provider.service';

@Controller('verification-provider')
export class VerificationProviderController {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly verificationProviderService: VerificationProviderService,
  ) {}

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

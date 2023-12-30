import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MakeProviderDTO } from '../../../dtos/make-provider.dto';
import { IVerificationService } from '../../../interfaces/service/IVerificationService';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';
import { IVerificationServiceFactory } from '../../../interfaces/factory/IVerificationServiceFactory';

@Controller('')
export class VerificationServiceController {
  constructor(private readonly serviceFactory: IVerificationServiceFactory) {}

  @Post('verify')
  async verifyDocument(@Body() body: any) {
    const verifyDocumentDTO: VerifyDocumentDTO = body;

    const service: IVerificationService = this.serviceFactory.makeService();

    return await service.verifyDocument(verifyDocumentDTO);
  }

  @Get('/service/:id')
  async getServiceById(@Param('id') id: string) {
    const makeProviderDTO: MakeProviderDTO = {};
    const service: IVerificationService = this.serviceFactory.makeService();
  }
}

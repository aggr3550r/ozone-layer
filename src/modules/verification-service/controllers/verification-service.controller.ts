import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VerificationServiceFactory } from '../../../factories/verification-service.factory';
import { MakeProviderDTO } from '../../../dtos/make-provider.dto';
import { IVerificationService } from '../../../interfaces/service/IVerificationService';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';

@Controller('')
export class VerificationServiceController {
  constructor(private readonly serviceFactory: VerificationServiceFactory) {}

  @Post('verify')
  async verifyDocument(@Body() body: any) {
    const verifyDocumentDTO: VerifyDocumentDTO = body;

    const makeProviderDTO: MakeProviderDTO = {
      verificationType: verifyDocumentDTO.verificationType,
      country: verifyDocumentDTO.country,
    };

    const service: IVerificationService =
      this.serviceFactory.makeSvc(makeProviderDTO);

    return await service.verifyDocument(verifyDocumentDTO);
  }

  @Get('/service/:id')
  async getServiceById(@Param('id') id: string) {
    const makeProviderDTO: MakeProviderDTO = {};
    const service: IVerificationService =
      this.serviceFactory.makeSvc(makeProviderDTO);

    return await service.findById(id);
  }
}

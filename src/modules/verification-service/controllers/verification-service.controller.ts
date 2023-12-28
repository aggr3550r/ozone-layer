import { Body, Controller, Post } from '@nestjs/common';
import { VerificationServiceFactory } from '../../../factories/verification-service.factory';
import { MakeProviderDTO } from '../../../dtos/make-provider.dto';
import { IVerificationService } from '../../../interfaces/service/IVerificationService';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';

@Controller('verify')
export class VerificationServiceController {
  constructor(private readonly serviceFactory: VerificationServiceFactory) {}

  @Post('')
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
}

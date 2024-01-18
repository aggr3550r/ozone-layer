import { Body, Controller, Post } from '@nestjs/common';
import { VerificationService } from 'src/modules/verification-service/verification.service';
import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { ServiceType } from '../../enums/service-type.enum';
import { ProviderFactory } from '../../factories/provider.factory';

@Controller()
export class VerificationServiceController {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly verificationService: VerificationService,
  ) {
    this.verificationService = this.providerFactory.makeService({
      serviceType: ServiceType.VERIFICATION_SERVICE_SERVICE,
    }) as VerificationService;
  }

  @Post('verify')
  async verifyDocument(@Body() body: VerifyDocumentDTO) {
    return await this.verificationService.verifyDocument(body);
  }
}

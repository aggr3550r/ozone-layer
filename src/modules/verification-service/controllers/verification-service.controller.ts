import { Body, Controller, Post } from '@nestjs/common';
import { IVerificationService } from '../../../interfaces/service/IVerificationService';
import { VerifyDocumentDTO } from '../../../dtos/verify-document.dto';
import { ProviderFactory } from '../../../factories/provider.factory';
import { IMakeServiceType } from '../../../interfaces/factory/IMakeServiceType';
import { ServiceType } from '../../../enums/service-type.enum';

@Controller()
export class VerificationServiceController {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly verificationService: IVerificationService,
  ) {
    this.verificationService = this.providerFactory.makeService({
      serviceType: ServiceType.VERIFICATION_SERVICE_SERVICE,
    } as IMakeServiceType);
  }

  @Post('verify')
  async verifyDocument(@Body() body: VerifyDocumentDTO) {
    return await this.verificationService.verifyDocument(body);
  }
}

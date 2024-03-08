import { Body, Controller, Post } from '@nestjs/common';
import { VerificationService } from './verification.service';
import {
  CompareFaceDTO,
  VerifyBvnDTO,
  VerifyDocumentDTO,
  VerifyDriversLicenseDTO,
  VerifyIntlPassportDTO,
  VerifyNinDTO,
  VerifyPvcDTO,
} from '../../dtos';

@Controller()
export class VerificationServiceController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('verify/bvn')
  async verifyBvn(@Body() body: VerifyDocumentDTO<VerifyBvnDTO>) {
    return await this.verificationService.verifyDocument(body);
  }

  @Post('verify/nin')
  async verifyNin(@Body() body: VerifyDocumentDTO<VerifyNinDTO>) {
    return await this.verificationService.verifyDocument(body);
  }

  @Post('verify/pvc')
  async verifyPvc(@Body() body: VerifyDocumentDTO<VerifyPvcDTO>) {
    return await this.verificationService.verifyDocument(body);
  }

  @Post('verify/face-comparison')
  async compareFaces(@Body() body: VerifyDocumentDTO<CompareFaceDTO>) {
    return await this.verificationService.verifyDocument(body);
  }

  @Post('verify/passport')
  async verifyIntlPassport(
    @Body() body: VerifyDocumentDTO<VerifyIntlPassportDTO>,
  ) {
    return await this.verificationService.verifyDocument(body);
  }

  @Post('verify/drivers-license')
  async verifyDriversLicense(
    @Body() body: VerifyDocumentDTO<VerifyDriversLicenseDTO>,
  ) {
    return await this.verificationService.verifyDocument(body);
  }
}

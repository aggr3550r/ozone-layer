import { Body, Controller, Post } from '@nestjs/common';
import { VerifyDocumentDTO } from '../../dtos/verify-document.dto';
import { VerificationService } from './verification.service';

@Controller()
export class VerificationServiceController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('verify')
  async verifyDocument(@Body() body: VerifyDocumentDTO) {
    return await this.verificationService.verifyDocument(body);
  }
}

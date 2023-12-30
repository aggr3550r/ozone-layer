import { Injectable } from '@nestjs/common';
import { IVerificationServiceFactory } from '../interfaces/factory/IVerificationServiceFactory';
import { VerificationService } from '../modules/verification-service/services/verification.service';

@Injectable()
export class VerificationServiceFactory implements IVerificationServiceFactory {
  constructor(private readonly verificationService: VerificationService) {}
  public makeService(): any {
    return this.verificationService;
  }
}

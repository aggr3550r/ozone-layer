import { Injectable } from '@nestjs/common';
import { VerifyDocumentDTO } from '../dtos/verify-document.dto';
import {
  VerifyDriversLicenseDTO,
  VerifyIntlPassportDTO,
  VerifySsnDTO,
} from '../dtos';
import {
  IDriversLicenseVerificationProvider,
  IIntlPassportVerificationProvider,
  ISsnVerificationProvider,
} from '../interfaces';

@Injectable()
export class TruliooProvider
  implements
    ISsnVerificationProvider,
    IDriversLicenseVerificationProvider,
    IIntlPassportVerificationProvider
{
  public async verifyDriversLicense(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyDriversLicenseDTO>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async verifyIntlPassport(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyIntlPassportDTO>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public async verifySsn(
    verifyDocumentDTO: VerifyDocumentDTO<VerifySsnDTO>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

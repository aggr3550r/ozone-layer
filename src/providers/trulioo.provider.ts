import { Injectable } from '@nestjs/common';
import { ISsnVerificationProvider } from '../interfaces/provider/ISSNVerificationProvider';
import { IDriversLicenseVerificationProvider } from '../interfaces/provider/IDriversLicenseVerificationProvider';
import { IIntlPassportVerificationProvider } from '../interfaces/provider/IIntlPassportVerificationProvider';
import { VerifyDocumentDTO } from '../dtos/verify-document.dto';

@Injectable()
export class TruliooProvider
  implements
    ISsnVerificationProvider,
    IDriversLicenseVerificationProvider,
    IIntlPassportVerificationProvider
{
  public async verifyDriversLicense(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyIntlPassport(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifySsn(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

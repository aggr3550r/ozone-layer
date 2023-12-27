import { Injectable } from '@nestjs/common';
import { ISsnVerificationProvider } from '../interfaces/providers/ISSNVerificationProvider';
import { IDriversLicenseVerificationProvider } from '../interfaces/providers/IDriversLicenseVerificationProvider';
import { IIntlPassportVerificationProvider } from '../interfaces/providers/IIntlPassportVerificationProvider';
import { VerifyDocumentDTO } from '../dtos/verify-document.dto';

@Injectable()
export class Trulioo
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

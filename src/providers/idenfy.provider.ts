import { Injectable } from '@nestjs/common';
import { ISsnVerificationProvider } from '../interfaces/providers/ISSNVerificationProvider';
import { IDriversLicenseVerificationProvider } from '../interfaces/providers/IDriversLicenseVerificationProvider';
import { IFaceIDVerificationProvider } from '../interfaces/providers/IFaceIDVerificationProvider';
import { IIntlPassportVerificationProvider } from '../interfaces/providers/IIntlPassportVerificationProvider';
import { VerifyDocumentDTO } from '../dtos/verify-document.dto';

@Injectable()
export class Idenfy
  implements
    ISsnVerificationProvider,
    IDriversLicenseVerificationProvider,
    IFaceIDVerificationProvider,
    IIntlPassportVerificationProvider
{
  public async verifySsn(verifyDocumentDTO: VerifyDocumentDTO): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyDriversLicense(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyFaceID(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyIntlPassport(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

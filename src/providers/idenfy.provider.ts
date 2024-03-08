import { Injectable } from '@nestjs/common';
import { VerifyDocumentDTO } from '../dtos/verify-document.dto';
import {
  IDriversLicenseVerificationProvider,
  IFaceIDVerificationProvider,
  IIntlPassportVerificationProvider,
  ISsnVerificationProvider,
} from '../interfaces';
import {
  VerifyDriversLicenseDTO,
  VerifyIntlPassportDTO,
  VerifySsnDTO,
} from '../dtos';

@Injectable()
export class IdenfyProvider
  implements
    ISsnVerificationProvider,
    IDriversLicenseVerificationProvider,
    IFaceIDVerificationProvider,
    IIntlPassportVerificationProvider
{
  public async verifySsn(
    verifyDocumentDTO: VerifyDocumentDTO<VerifySsnDTO>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyDriversLicense(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyDriversLicenseDTO>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyFaceID(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyIntlPassport(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyIntlPassportDTO>,
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

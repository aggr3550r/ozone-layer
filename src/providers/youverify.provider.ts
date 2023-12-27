import { Injectable } from '@nestjs/common';
import { IBvnVerificationProvider } from '../interfaces/providers/IBVNVerifcationProvider';
import { INinVerificationProvider } from '../interfaces/providers/ININVerificationProvider';
import { IPvcVerificationProvider } from '../interfaces/providers/IPVCVerificationProvider';
import { IFaceIDVerificationProvider } from '../interfaces/providers/IFaceIDVerificationProvider';

@Injectable()
export class YouVerify
  implements
    IBvnVerificationProvider,
    INinVerificationProvider,
    IPvcVerificationProvider,
    IFaceIDVerificationProvider
{
  public async verifyFaceID(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyPvc(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyNin(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyBvn(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

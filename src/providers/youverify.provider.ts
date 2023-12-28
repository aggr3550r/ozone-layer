import { Injectable } from '@nestjs/common';
import { IBvnVerificationProvider } from '../interfaces/provider/IBVNVerifcationProvider';
import { INinVerificationProvider } from '../interfaces/provider/ININVerificationProvider';
import { IPvcVerificationProvider } from '../interfaces/provider/IPVCVerificationProvider';
import { IFaceIDVerificationProvider } from '../interfaces/provider/IFaceIDVerificationProvider';

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

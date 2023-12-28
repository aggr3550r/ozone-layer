import { Injectable } from '@nestjs/common';
import { IBvnVerificationProvider } from '../interfaces/provider/IBVNVerifcationProvider';
import { INinVerificationProvider } from '../interfaces/provider/ININVerificationProvider';

@Injectable()
export class Paystack
  implements IBvnVerificationProvider, INinVerificationProvider
{
  public async verifyBvn(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async verifyNin(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

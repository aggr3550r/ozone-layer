import { Injectable } from '@nestjs/common';
import { IBvnVerificationProvider } from '../interfaces/providers/IBVNVerifcationProvider';
import { INinVerificationProvider } from '../interfaces/providers/ININVerificationProvider';

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

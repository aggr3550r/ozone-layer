import { MakeProviderDTO } from '../../dtos';

export interface IVerificationProviderFactory {
  makeVerificationProvider(input?: MakeProviderDTO): any;
}

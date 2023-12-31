import { MakeProviderDTO } from '../../dtos/make-provider.dto';

export interface IVerificationProviderFactory {
  makeVerificationProvider(input?: MakeProviderDTO): any;
}

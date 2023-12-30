import { MakeProviderDTO } from '../../dtos/make-provider.dto';

export interface IVerificationProviderFactory {
  makeProvider(input?: MakeProviderDTO): any;
}

import { MakeProviderDTO } from '../../dtos/make-provider.dto';

export interface IVerificationServiceFactory {
  makeSvc(input: MakeProviderDTO): any;
}

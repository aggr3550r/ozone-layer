import { AllTheProviders } from 'src/interfaces/AllTheProviders';
import { MakeProviderDTO } from '../../dtos/make-provider.dto';

export interface IVerificationProviderFactory {
  makeVerificationProvider(input?: MakeProviderDTO): Promise<AllTheProviders>;
}

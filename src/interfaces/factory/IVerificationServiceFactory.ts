import { AllTheServices } from 'src/interfaces/AllTheProviders';
import { MakeProviderDTO } from '../../dtos/make-provider.dto';

export interface IVerificationServiceFactory {
  makeService(input?: MakeProviderDTO): AllTheServices;
}

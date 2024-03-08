import { IMakeVerificationProviderType } from './IMakeVerificationProviderType';

export interface IVerificationProviderFactory {
  makeVerificationProvider(input?: IMakeVerificationProviderType): any;
}

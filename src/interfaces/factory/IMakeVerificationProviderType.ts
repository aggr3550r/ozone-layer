import { Country } from '../../enums/country.enum';
import { VerificationType } from '../../enums/verification-type.enum';

export interface IMakeVerificationProviderType {
  verificationType?: VerificationType;
  country?: Country;
}

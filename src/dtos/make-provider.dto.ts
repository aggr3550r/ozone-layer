import { Country } from '../enums/country.enum';
import { VerificationType } from '../enums/verification-type.enum';

export class MakeProviderDTO {
  verificationType?: VerificationType;
  country?: Country;
}

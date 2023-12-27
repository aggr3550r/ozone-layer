import { Countries } from '../enums/countries.enum';
import { VerificationType } from '../enums/verification-type.enum';

export class MakeProviderDTO {
  verificationType?: VerificationType;
  country?: Countries;
}

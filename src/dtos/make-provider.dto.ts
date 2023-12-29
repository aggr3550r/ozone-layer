import { Country } from '../enums/country.enum';
import { AppProviderType } from '../enums/provider.enum';
import { RepositoryType } from '../enums/repository-type.enum';
import { VerificationType } from '../enums/verification-type.enum';

export class MakeProviderDTO {
  verificationType?: VerificationType;
  country?: Country;
  repositoryType?: RepositoryType;
}

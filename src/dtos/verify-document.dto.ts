import { IsEnum, IsOptional } from 'class-validator';
import { VerificationType } from '../enums/verification-type.enum';
import { Country } from '../enums/country.enum';

export class VerifyDocumentDTO {
  @IsOptional()
  @IsEnum(VerificationType)
  verificationType?: VerificationType;

  @IsOptional()
  @IsEnum(Country)
  country?: Country;

  @IsOptional()
  data?: any;
}

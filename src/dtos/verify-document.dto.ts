import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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

  @IsOptional()
  @IsString()
  identifier?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;
}

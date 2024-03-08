import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Country, VerificationType } from '../enums';

export class VerifyDocumentDTO<T> {
  @IsOptional()
  @IsEnum(VerificationType)
  verificationType?: VerificationType;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Country)
  country: Country;

  @IsOptional()
  data?: T;

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

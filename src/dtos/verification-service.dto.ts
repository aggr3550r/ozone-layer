import { PartialType } from '@nestjs/mapped-types';
import { Country } from '../enums/country.enum';
import { VerificationType } from '../enums/verification-type.enum';
import { BaseDTO } from './base.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateVerificationServiceConfigDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsNotEmpty()
  @IsEnum(VerificationType)
  verificationType: VerificationType;
}

export class UpdateVerificationServiceConfigDTO extends PartialType(
  CreateVerificationServiceConfigDTO,
) {}

export class VerificationServiceConfigDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsNotEmpty()
  @IsEnum(VerificationType)
  verificationType: VerificationType;
}

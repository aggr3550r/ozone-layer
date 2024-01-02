import { PartialType } from '@nestjs/mapped-types';
import { Country } from '../enums/country.enum';
import { VerificationType } from '../enums/verification-type.enum';
import { BaseDTO } from './base.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProviderCode } from '../enums/provider.enum';

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

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsEnum(ProviderCode)
  providerCode?: ProviderCode;
}

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
  VerificationServiceConfigDTO,
) {}

export class FindServiceConfigByCriteriaDTO extends PartialType(BaseDTO) {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(Country)
  country?: Country;

  @IsOptional()
  @IsEnum(VerificationType)
  verificationType?: VerificationType;
}

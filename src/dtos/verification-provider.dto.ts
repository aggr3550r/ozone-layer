import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Country } from '../enums/country.enum';
import { Provider, ProviderCode } from '../enums/provider.enum';
import { BaseDTO } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';

export class VerificationProviderDTO extends BaseDTO {
  @IsNotEmpty()
  @IsEnum(Provider)
  name: Provider;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsNotEmpty()
  @IsEnum(ProviderCode)
  code: ProviderCode;
}

export class CreateVerificationProviderDTO {
  @IsNotEmpty()
  @IsEnum(Provider)
  name: Provider;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsNotEmpty()
  @IsEnum(ProviderCode)
  code: ProviderCode;
}

export class UpdateVerificationProviderDTO extends PartialType(
  CreateVerificationProviderDTO,
) {}

export class FindProviderByCriteriaDTO extends PartialType(BaseDTO) {
  @IsOptional()
  @IsEnum(Provider)
  name?: Provider;

  @IsOptional()
  @IsEnum(Country)
  country?: Country;

  @IsOptional()
  @IsEnum(ProviderCode)
  code?: ProviderCode;
}

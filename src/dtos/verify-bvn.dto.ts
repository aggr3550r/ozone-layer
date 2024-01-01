import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class VerifyBvnDTO {
  @IsNotEmpty()
  bvn: string;

  @IsNotEmpty()
  account_number: string;

  @IsNotEmpty()
  bank_code: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsDateString()
  dob?: string;
}

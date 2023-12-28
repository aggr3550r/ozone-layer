import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { Country } from '../../../enums/country.enum';
import { VerificationType } from '../../../enums/verification-type.enum';

@Entity('verification_service_config')
export class VerificationServiceConfig extends BaseModel {
  @Column({ nullable: false })
  code: string;

  @Column({ type: 'enum', enum: Country, nullable: false })
  country: Country;

  @Column({ type: 'enum', enum: VerificationType, nullable: false })
  verificationType: VerificationType;
}

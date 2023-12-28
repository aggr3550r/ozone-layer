import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { Provider, ProviderCode } from '../../../enums/provider.enum';
import { Country } from '../../../enums/country.enum';

@Entity('verification_provider')
export class VerificationProvider extends BaseModel {
  @Column({ type: 'enum', enum: Provider, nullable: false })
  name: Provider;

  @Column({ type: 'enum', enum: Country, nullable: false })
  country: Country;

  @Column({ type: 'enum', enum: ProviderCode, nullable: false })
  code: ProviderCode;
}

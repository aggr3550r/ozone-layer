import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../models/base.model';
import { Country } from '../../../enums/country.enum';
import { VerificationType } from '../../../enums/verification-type.enum';
import { VerificationProvider } from '../../verification-provider/data/verification-provider.entity';
import { ProviderCode } from '../../../enums/provider.enum';

@Entity('verification_service_config')
export class VerificationServiceConfig extends BaseModel {
  @Column({ nullable: false })
  code: string;

  @Column({ type: 'enum', enum: Country, nullable: false })
  country: Country;

  @Column({ type: 'enum', enum: VerificationType, nullable: false })
  verificationType: VerificationType;

  @ManyToOne(() => VerificationProvider, (provider) => provider.id, {
    eager: true,
  })
  @JoinColumn()
  provider?: string;

  @ManyToOne(() => VerificationProvider, (provider) => provider.code, {
    eager: true,
  })
  providerCode?: ProviderCode;
}

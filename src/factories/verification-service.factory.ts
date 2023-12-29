import {
  BadRequestException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { IVerificationServiceFactory } from '../interfaces/factory/IVerificationServiceFactory';
import { MakeProviderDTO } from '../dtos/make-provider.dto';
import { AmericanVerificationService } from '../modules/verification-service/services/american-verification.service';
import { GermanVerificationService } from '../modules/verification-service/services/german-verification.service';
import { NigerianVerificationService } from '../modules/verification-service/services/nigerian-verification.service';
import { Country } from '../enums/country.enum';
import { AppProviderType } from '../enums/provider.enum';

@Injectable()
export class VerificationServiceFactory implements IVerificationServiceFactory {
  constructor(
    private readonly americanVerificationService: AmericanVerificationService,
    private readonly germanVerificationService: GermanVerificationService,
    private readonly nigerianVerificationService: NigerianVerificationService,
  ) {}
  public makeProvider(input: MakeProviderDTO): any {
    if (
      !(input?.providerType == AppProviderType.SERVICE && input?.identifier)
    ) {
      throw new BadRequestException(
        'Please provide the country whose verification service you require.',
      );
    }

    return this.resolveSvcByCountry(input);
  }

  private resolveSvcByCountry(input: MakeProviderDTO) {
    let provider: any;
    switch (input?.identifier?.toLowerCase()) {
      case Country.NIGERIA:
        provider = this.nigerianVerificationService;
        break;
      case Country.UNITED_STATES:
        provider = this.americanVerificationService;
        break;
      case Country.GERMANY:
        provider = this.germanVerificationService;
        break;

      default:
        throw new NotImplementedException(
          'We do not cater for users in that country',
        );
        break;
    }

    return provider;
  }
}

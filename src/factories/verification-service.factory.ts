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
import { Countries } from '../enums/countries.enum';

@Injectable()
export class VerificationServiceFactory implements IVerificationServiceFactory {
  constructor(
    private readonly americanVerificationService: AmericanVerificationService,
    private readonly germanVerificationService: GermanVerificationService,
    private readonly nigerianVerificationService: NigerianVerificationService,
  ) {}
  public makeSvc(input: MakeProviderDTO): any {
    if (!input?.country) {
      throw new BadRequestException(
        'Please provide the country whose verification service you require.',
      );
    }

    return this.resolveSvcByCountry(input);
  }

  private resolveSvcByCountry(input: MakeProviderDTO) {
    let provider: any;
    switch (input?.country?.toLowerCase()) {
      case Countries.NIGERIA:
        provider = this.nigerianVerificationService;
        break;
      case Countries.UNITED_STATES:
        provider = this.americanVerificationService;
        break;
      case Countries.GERMANY:
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

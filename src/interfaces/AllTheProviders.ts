// name this better

import { VerificationProviderService } from 'src/modules/verification-provider/verification-provider.service';
import { VerificationServiceConfigService } from 'src/modules/verification-service-config/verification-service-config.service';
import { VerificationService } from 'src/modules/verification-service/verification.service';
import { IdenfyProvider } from 'src/providers/idenfy.provider';
import { PaystackProvider } from 'src/providers/paystack.provider';
import { TruliooProvider } from 'src/providers/trulioo.provider';
import { YouVerifyProvider } from 'src/providers/youverify.provider';

// please give it a better name and also add more here, you can then easily cast with as because you will know which exact one you need
export type AllTheProviders =
  | YouVerifyProvider
  | PaystackProvider
  | TruliooProvider
  | IdenfyProvider;

export type AllTheServices =
  | VerificationService
  | VerificationServiceConfigService
  | VerificationProviderService;

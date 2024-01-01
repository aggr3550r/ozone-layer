import { Injectable } from '@nestjs/common';
import { IBvnVerificationProvider } from '../interfaces/provider/IBVNVerifcationProvider';
import { VerificationStatus } from '../enums/verification-status.enum';
import RequestUtil from '../utils/request.util';
import { VerificationProviderResponse } from '../models/verification-provider.response.model';
import AbstractVerificationProvider from '../AbstractVerificationProvider';
import { VerifyDocumentDTO } from '../dtos/verify-document.dto';

@Injectable()
export class PaystackProvider
  extends AbstractVerificationProvider
  implements IBvnVerificationProvider
{
  paystackBaseUrl: string = process.env.PAYSTACK_BASE_URL;
  paystackAuthHeader = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  };

  constructor() {
    super();
  }

  async verifyBvn(
    verifyDocumentDTO: VerifyDocumentDTO,
  ): Promise<VerificationProviderResponse<any>> {
    try {
      const bvnVerificationUrl = this.paystackBaseUrl.concat(
        process.env.PAYSTACK_VERIFY_BVN_URL,
      );
      console.info('paystack bvnVerificationUrl %s', bvnVerificationUrl);

      const bvnLookupResponse = await RequestUtil.makePostRequest(
        bvnVerificationUrl,
        verifyDocumentDTO,
        this.paystackAuthHeader,
      );
      const bvnlookup = bvnLookupResponse?.data?.data;
      console.info('bvnlookup:\n %o', bvnlookup);

      if (bvnlookup) {
        const { is_blacklisted, account_number, first_name, last_name } =
          bvnlookup;

        if (is_blacklisted) {
          return {
            status: VerificationStatus.FAILED,
            message: 'BVN has been blacklisted.',
          };
        }

        if (!account_number) {
          return {
            status: VerificationStatus.FAILED,
            message: "Account number doesn't match bvn",
          };
        }

        if (!first_name) {
          return {
            status: VerificationStatus.FAILED,
            message: "First name doesn't match bvn",
          };
        }

        if (!last_name) {
          return {
            status: VerificationStatus.FAILED,
            message: "Last name doesn't match bvn",
          };
        }

        return {
          status: VerificationStatus.SUCCESS,
          message: 'Bvn validation successful',
        };
      }

      return {
        status: VerificationStatus.FAILED,
        message: 'Bvn validation failed',
      };
    } catch (error) {
      console.error('verifyBvn error \n %o', error.response);

      if (
        error.response?.data?.status === false &&
        error.response?.data?.message ==
          'BVN match requests exhausted for the month'
      ) {
        return {
          status: VerificationStatus.ERROR,
          message:
            'Error occurred while attempting to verify BVN. Admin support required.',
        };
      }

      if (error.response?.data?.status === false) {
        return {
          status: VerificationStatus.ERROR,
          message:
            'Error occurred while attempting to verify BVN. Please try again later.',
        };
      }
      return {
        status: VerificationStatus.ERROR,
        message:
          'Error occurred while attempting to verify BVN. Please try again later.',
      };
    }
  }
}

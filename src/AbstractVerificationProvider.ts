import { VerificationStatus } from './enums/verification-status.enum';
import { VerificationProviderResponse } from './models/verification-provider.response.model';

export default abstract class AbstractVerificationProvider {
  public getErrorMessage(info) {
    return (
      info?.response?.data?.message || info?.message || 'Verification failed'
    );
  }

  public getVerificationErrorResponse(
    info?: any,
  ): VerificationProviderResponse<any> {
    return new VerificationProviderResponse(
      VerificationStatus.ERROR,
      this.getErrorMessage(info),
      this.buildValidationErrorMessage(info?.data?.validations?.data),
    );
  }

  public buildValidationErrorMessage(data: {
    lastName: {
      validated: boolean;
      value: string;
    };
    firstName: {
      validated: boolean;
      value: string;
    };
    dateOfBirth: {
      validated: boolean;
      value: string;
    };
  }) {
    const response = {
      firstName: null,
      lastName: null,
      dateOfBirth: null,
    };

    if (data?.firstName) {
      response.firstName = data?.firstName?.validated;
    }

    if (data?.lastName) {
      response.lastName = data?.lastName?.validated;
    }

    if (data?.dateOfBirth) {
      response.dateOfBirth = data?.dateOfBirth?.validated;
    }

    return response;
  }
}

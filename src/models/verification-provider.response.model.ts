import { VerificationStatus } from '../enums/verification-status.enum';

export class VerificationProviderResponse<T> {
  status: VerificationStatus;
  message: string;
  data?: T | Record<string, any>;

  constructor(
    status: VerificationStatus,
    message: string,
    data?: T | Record<string, any>,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

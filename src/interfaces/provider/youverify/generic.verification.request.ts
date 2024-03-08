export interface YouVerifyGenericVerificationRequest {
  id: string;
  lastName?: string;
  isSubjectConsent: boolean;
  validations?: {
    data: {
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
    };
    selfie?: {
      image: string;
    };
  };
}

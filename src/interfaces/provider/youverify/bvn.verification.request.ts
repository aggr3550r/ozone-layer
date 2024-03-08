export interface YouVerifyBvnVerificationRequest {
  id: string;
  isSubjectConsent: boolean;
  validations: {
    data: {
      lastName: string;
      firstName: string;
      dateOfBirth?: string;
    };
  };
}

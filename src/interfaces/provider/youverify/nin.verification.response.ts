export default interface YouVerifyNinVerificationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    address: {
      town: string;
      lga: string;
      state: string;
      addressLine: string;
    };
    validations: {
      data: {
        lastName: {
          validated: boolean;
          value: string;
        };
        dateOfBirth: {
          validated: boolean;
          value: string;
        };
        firstName: {
          validated: boolean;
          value: string;
        };
      };
      selfie: {
        selfieVerification: {
          confidenceLevel: number;
          match: boolean;
          image: string;
        };
      };
      validationMessages: '';
    };
    parentId: string;
    status: string;
    dataValidation: boolean;
    selfieValidation: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    image: string;
    signature: string;
    mobile: string;
    email: string;
    birthState: string;
    nokState: any;
    religion: string;
    birthLGA: string;
    birthCountry: string;
    dateOfBirth: string;
    isConsent: boolean;
    idNumber: string;
    businessId: string;
    type: string;
    gender: '';
    requestedAt: string;
    country: string;
    createdAt: string;
    lastModifiedAt: string;
    id: string;
    requestedBy: {
      firstName: string;
      lastName: string;
      middleName: string;
      id: string;
    };
  };
}

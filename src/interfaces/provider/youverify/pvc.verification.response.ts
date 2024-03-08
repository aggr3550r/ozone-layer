export interface YouVerifyPvcVerificationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
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
      validationMessages: string;
    };
    parentId: any;
    status: string;
    reason: string;
    dataValidation: boolean;
    selfieValidation: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    isConsent: boolean;
    idNumber: string;
    businessId: string;
    type: string;
    requestedAt: string;
    requestedById: string;
    country: string;
    createdAt: string;
    lastModifiedAt: string;
    requestedBy: {
      firstName: string;
      lastName: string;
      middleName: string;
      id: string;
    };
  };
  links: [];
}

export default interface YouVerifyDriversLicenseVerificationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
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
      validationMessages: string;
    };
    parentId: string;
    status: string;
    dataValidation: boolean;
    selfieValidation: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    expiredDate: string;
    issuedDate: string;
    stateOfIssuance: string;
    notifyWhenIdExpire: boolean;
    image: string;
    mobile: string;
    email: string;
    dateOfBirth: string;
    isConsent: boolean;
    idNumber: string;
    businessId: string;
    type: string;
    gender: string;
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
  links: Array<any>;
}

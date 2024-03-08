export interface YouVerifyFacialComparisonRequest {
  image1: string;
  image2: string;
  isSubjectConsent: boolean;
}

export interface YouVerifyFacialComparisonResponse {
  id: string;
  parentId: string;
  status: string;
  reason: string;
  selfieValidation: boolean;
  imageComparison: {
    confidenceLevel: number;
    threshold: number;
    match: boolean;
    image1: string;
    image2: string;
  };
  isConsent: boolean;
  idNumber: string;
  businessId: string;
  type: string;
  requestedAt: string;
  requestedById: string;
  createdAt: string;
  lastModifiedAt: string;
  requestedBy: {
    firstName: string;
    lastName: string;
    middleName: string;
    id: string;
  };
}

export interface YouVerifyResponseModel<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  links?: [];
}

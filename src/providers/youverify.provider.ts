import { Injectable } from '@nestjs/common';
import AbstractVerificationProvider from '../AbstractVerificationProvider';
import {
  IBvnVerificationProvider,
  INinVerificationProvider,
  IPvcVerificationProvider,
  IIntlPassportVerificationProvider,
  IDriversLicenseVerificationProvider,
  IFacialComparisonProvider,
  YouVerifyFacialComparisonRequest,
  YouVerifyResponseModel,
  YouVerifyFacialComparisonResponse,
  YouVerifyBvnVerificationResponse,
  YouVerifyBvnVerificationRequest,
  YouVerifyNinVerificationResponse,
  YouVerifyPvcVerificationResponse,
  YouVerifyGenericVerificationRequest,
  YouVerifyDriversLicenseVerificationResponse,
} from '../interfaces';
import {
  CompareFaceDTO,
  VerifyBvnDTO,
  VerifyDocumentDTO,
  VerifyDriversLicenseDTO,
  VerifyIntlPassportDTO,
  VerifyNinDTO,
  VerifyPvcDTO,
} from '../dtos';
import { VerificationProviderResponse } from '../models';
import {
  YOUVERIFY_API_VERSION,
  YOUVERIFY_BASE_URL,
  YOUVERIFY_FACIAL_COMPARISON_URL,
  YOUVERIFY_VERIFY_BVN_URL,
  YOUVERIFY_VERIFY_DRIVERS_LICENSE_URL,
  YOUVERIFY_VERIFY_INTL_PASSPORT_URL,
  YOUVERIFY_VERIFY_NIN_URL,
  YOUVERIFY_VERIFY_PVC_URL,
} from '../config/env';
import RequestUtil from '../utils/request.util';
import { VerificationStatus } from '../enums';

@Injectable()
export class YouVerifyProvider
  extends AbstractVerificationProvider
  implements
    IBvnVerificationProvider,
    INinVerificationProvider,
    IPvcVerificationProvider,
    IIntlPassportVerificationProvider,
    IDriversLicenseVerificationProvider,
    IFacialComparisonProvider
{
  private static REQUEST_HEADER;

  constructor() {
    YouVerifyProvider.REQUEST_HEADER = { token: process.env.YOUVERIFY_API_KEY };
    super();
  }

  public async verifyBvn(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyBvnDTO>,
  ): Promise<VerificationProviderResponse<YouVerifyBvnVerificationResponse>> {
    try {
      const verifyBvnUrl = YOUVERIFY_BASE_URL.concat(
        YOUVERIFY_API_VERSION,
        YOUVERIFY_VERIFY_BVN_URL,
      );

      console.info('verifyBvnUrl %s', verifyBvnUrl);

      const verifyBvnRequest: YouVerifyBvnVerificationRequest = {
        id: verifyDocumentDTO.identifier,
        isSubjectConsent: true,
        validations: {
          data: {
            lastName: verifyDocumentDTO.lastName,
            firstName: verifyDocumentDTO.firstName,
          },
        },
      };

      if (verifyDocumentDTO.dob) {
        verifyBvnRequest.validations.data.dateOfBirth = verifyDocumentDTO.dob;
      }
      console.info('verifyBvnRequest \n %o', verifyBvnRequest);

      const verifyBvnResponse: YouVerifyBvnVerificationResponse = (
        await RequestUtil.makePostRequest(
          verifyBvnUrl,
          verifyBvnRequest,
          YouVerifyProvider.REQUEST_HEADER,
        )
      ).data;
      console.info('verifyBvnResponse \n %o', verifyBvnResponse);

      if (!verifyBvnResponse?.success) {
        return this.getVerificationErrorResponse(verifyBvnResponse);
      }

      if (
        (verifyBvnResponse?.data?.validations?.data?.firstName &&
          !verifyBvnResponse?.data?.validations?.data?.firstName?.validated) ||
        (verifyBvnResponse?.data?.validations?.data?.lastName &&
          !verifyBvnResponse?.data?.validations?.data?.lastName?.validated) ||
        (verifyBvnResponse?.data?.validations?.data?.dateOfBirth &&
          !verifyBvnResponse?.data?.validations?.data?.dateOfBirth?.validated)
      ) {
        return new VerificationProviderResponse(
          VerificationStatus.FAILED,
          verifyBvnResponse?.data?.validations?.validationMessages ||
            'Verification failed',
        );
      }

      return new VerificationProviderResponse(
        VerificationStatus.SUCCESS,
        'Verification successful',
        verifyBvnResponse?.data,
      );
    } catch (error) {
      console.error(
        'YouVerifyProvider :: verifyBvn() error \n %o',
        {
          statusText: error.response.statusText,
          statusMessage: error.response.data,
        },
        this.getVerificationErrorResponse(error),
      );
      return this.getVerificationErrorResponse(error);
    }
  }

  public async verifyNin(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyNinDTO>,
  ): Promise<VerificationProviderResponse<YouVerifyNinVerificationResponse>> {
    try {
      const verifyNinUrl = YOUVERIFY_BASE_URL.concat(
        YOUVERIFY_API_VERSION,
        YOUVERIFY_VERIFY_NIN_URL,
      );
      console.info('verifyNinUrl %s', verifyNinUrl);

      const verifyNinRequest =
        YouVerifyProvider.buildNinVerificationPayload(verifyDocumentDTO);
      console.info('verifyNinRequest \n %o', verifyNinRequest);

      const verifyNinResponse: YouVerifyNinVerificationResponse = (
        await RequestUtil.makePostRequest(
          verifyNinUrl,
          verifyNinRequest,
          YouVerifyProvider.REQUEST_HEADER,
        )
      ).data;
      console.info('verifyNinResponse \n %o', verifyNinResponse);

      if (!verifyNinResponse?.success) {
        return this.getVerificationErrorResponse(verifyNinResponse);
      }

      if (
        (verifyNinResponse?.data?.validations?.data?.firstName &&
          !verifyNinResponse?.data?.validations?.data?.firstName?.validated) ||
        (verifyNinResponse?.data?.validations?.data?.lastName &&
          !verifyNinResponse?.data?.validations?.data?.lastName?.validated) ||
        (verifyNinResponse?.data?.validations?.data?.dateOfBirth &&
          !verifyNinResponse?.data?.validations?.data?.dateOfBirth?.validated &&
          !verifyNinResponse?.data.validations?.selfie?.selfieVerification
            ?.match)
      ) {
        return new VerificationProviderResponse(
          VerificationStatus.FAILED,
          verifyNinResponse?.data?.validations?.validationMessages ||
            'Verification successful',
          this.buildValidationErrorMessage(
            verifyNinResponse?.data?.validations?.data,
          ),
        );
      }

      return new VerificationProviderResponse(
        VerificationStatus.SUCCESS,
        'Verification successful',
        verifyNinResponse?.data,
      );
    } catch (error) {
      console.error(
        'YouVerifyProvider :: verifyNin() error \n %o',
        this.getVerificationErrorResponse(error),
      );
      return this.getVerificationErrorResponse(error);
    }
  }

  public async verifyPvc(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyPvcDTO>,
  ): Promise<VerificationProviderResponse<any>> {
    try {
      const verifyPvcUrl = YOUVERIFY_BASE_URL.concat(
        YOUVERIFY_API_VERSION,
        YOUVERIFY_VERIFY_PVC_URL,
      );
      console.info('verifyPvcUrl %s', verifyPvcUrl);

      const verifyPvcRequest =
        YouVerifyProvider.buildVerificationPayload(verifyDocumentDTO);
      console.info('verifyPvcRequest \n %o', verifyPvcRequest);

      const verifyPvcResponse: YouVerifyPvcVerificationResponse = (
        await RequestUtil.makePostRequest(
          verifyPvcUrl,
          verifyPvcRequest,
          YouVerifyProvider.REQUEST_HEADER,
        )
      ).data;
      console.info('verifyPvcResponse \n %o', verifyPvcResponse);

      if (!verifyPvcResponse?.success) {
        return this.getVerificationErrorResponse(verifyPvcResponse);
      }

      if (
        (verifyPvcResponse?.data?.validations?.data?.firstName &&
          !verifyPvcResponse?.data?.validations?.data?.firstName?.validated) ||
        (verifyPvcResponse?.data?.validations?.data?.lastName &&
          !verifyPvcResponse?.data?.validations?.data?.lastName?.validated) ||
        (verifyPvcResponse?.data?.validations?.data?.dateOfBirth &&
          !verifyPvcResponse?.data?.validations?.data?.dateOfBirth?.validated)
      ) {
        return new VerificationProviderResponse(
          VerificationStatus.FAILED,
          verifyPvcResponse?.data?.validations?.validationMessages ||
            'Verification successful',
          this.buildValidationErrorMessage(
            verifyPvcResponse?.data?.validations?.data,
          ),
        );
      }

      return new VerificationProviderResponse(
        VerificationStatus.SUCCESS,
        'Verification Successful',
        verifyPvcResponse,
      );
    } catch (error) {
      console.error(
        'YouVerifyProvider :: verifyPvc() error \n %o',
        {
          statusText: error.response.statusText,
          statusMessage: error.response.data,
        },
        this.getVerificationErrorResponse(error),
      );
      return this.getVerificationErrorResponse(error);
    }
  }

  async verifyIntlPassport(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyIntlPassportDTO>,
  ): Promise<VerificationProviderResponse<any>> {
    try {
      const verifyIntlPassportUrl = YOUVERIFY_BASE_URL.concat(
        YOUVERIFY_API_VERSION,
        YOUVERIFY_VERIFY_INTL_PASSPORT_URL,
      );
      console.info('verifyIntlPassportUrl %s', verifyIntlPassportUrl);

      const verifyIntlPassportRequest: YouVerifyGenericVerificationRequest = {
        id: verifyDocumentDTO.identifier,
        isSubjectConsent: true,
        lastName: verifyDocumentDTO.lastName,
        validations: {
          data: {
            firstName: verifyDocumentDTO?.firstName,
          },
        },
      };

      if (verifyDocumentDTO.dob) {
        verifyIntlPassportRequest.validations.data.dateOfBirth =
          verifyDocumentDTO.dob;
      }
      console.info(
        'verifyIntlPassportRequest \n %o',
        verifyIntlPassportRequest,
      );

      const verifyIntlPassportResponse: YouVerifyNinVerificationResponse = (
        await RequestUtil.makePostRequest(
          verifyIntlPassportUrl,
          verifyIntlPassportRequest,
          YouVerifyProvider.REQUEST_HEADER,
        )
      ).data;
      console.info(
        'verifyIntlPassportResponse \n %o',
        verifyIntlPassportResponse,
      );

      if (!verifyIntlPassportResponse?.success) {
        return this.getVerificationErrorResponse(verifyIntlPassportResponse);
      }

      if (
        (verifyIntlPassportResponse?.data?.validations?.data?.firstName &&
          !verifyIntlPassportResponse?.data?.validations?.data?.firstName
            ?.validated) ||
        (verifyIntlPassportResponse?.data?.validations?.data?.lastName &&
          !verifyIntlPassportResponse?.data?.validations?.data?.lastName
            ?.validated) ||
        (verifyIntlPassportResponse?.data?.validations?.data?.dateOfBirth &&
          !verifyIntlPassportResponse?.data?.validations?.data?.dateOfBirth
            ?.validated)
      ) {
        return new VerificationProviderResponse(
          VerificationStatus.FAILED,
          verifyIntlPassportResponse?.data?.validations?.validationMessages ||
            'Verification Failed',
          this.buildValidationErrorMessage(
            verifyIntlPassportResponse?.data?.validations?.data,
          ),
        );
      }

      return new VerificationProviderResponse(
        VerificationStatus.SUCCESS,
        'Verification Successful',
        verifyIntlPassportResponse,
      );
    } catch (error) {
      console.error(
        'YouVerifyProvider :: verifyIntlPassport() error \n %o',
        {
          statusText: error.response.statusText,
          statusMessage: error.response.data,
        },
        this.getVerificationErrorResponse(error),
      );
      return this.getVerificationErrorResponse(error);
    }
  }

  public async verifyDriversLicense(
    verifyDocumentDTO: VerifyDocumentDTO<VerifyDriversLicenseDTO>,
  ): Promise<VerificationProviderResponse<any>> {
    try {
      const verifyDriverLicenseUrl = YOUVERIFY_BASE_URL.concat(
        YOUVERIFY_API_VERSION,
        YOUVERIFY_VERIFY_DRIVERS_LICENSE_URL,
      );
      console.info('verifyDriverLicenseUrl %s', verifyDriverLicenseUrl);

      const verifyDriverLicenseRequest =
        YouVerifyProvider.buildVerificationPayload(verifyDocumentDTO);
      console.info(
        'verifyDriverLicenseRequest \n %o',
        verifyDriverLicenseRequest,
      );

      const verifyDriverLicenseResponse: YouVerifyDriversLicenseVerificationResponse =
        (
          await RequestUtil.makePostRequest(
            verifyDriverLicenseUrl,
            verifyDriverLicenseRequest,
            YouVerifyProvider.REQUEST_HEADER,
          )
        ).data;
      console.info(
        'verifyDriverLicenseResponse \n %o',
        verifyDriverLicenseResponse,
      );

      if (!verifyDriverLicenseResponse?.success) {
        return this.getVerificationErrorResponse(verifyDriverLicenseResponse);
      }

      if (
        (verifyDriverLicenseResponse?.data?.validations?.data?.firstName &&
          !verifyDriverLicenseResponse?.data?.validations?.data?.firstName
            ?.validated) ||
        (verifyDriverLicenseResponse?.data?.validations?.data?.lastName &&
          !verifyDriverLicenseResponse?.data?.validations?.data?.lastName
            ?.validated) ||
        (verifyDriverLicenseResponse?.data?.validations?.data?.dateOfBirth &&
          !verifyDriverLicenseResponse?.data?.validations?.data?.dateOfBirth
            ?.validated)
      ) {
        return new VerificationProviderResponse(
          VerificationStatus.FAILED,
          verifyDriverLicenseResponse?.data?.validations?.validationMessages ||
            'Verification Failed',
          this.buildValidationErrorMessage(
            verifyDriverLicenseResponse?.data?.validations?.data,
          ),
        );
      }

      return new VerificationProviderResponse(
        VerificationStatus.SUCCESS,
        'Verification Successful',
        verifyDriverLicenseResponse,
      );
    } catch (error) {
      console.error(
        'YouVerifyProvider :: verifyDriversLicense() error \n %o',
        {
          statusText: error.response.statusText,
          statusMessage: error.response.data,
        },
        this.getVerificationErrorResponse(error),
      );
      return this.getVerificationErrorResponse(error);
    }
  }

  public async compareFaces(
    input: VerifyDocumentDTO<CompareFaceDTO>,
  ): Promise<any> {
    try {
      const facialComparisonUrl = YOUVERIFY_BASE_URL.concat(
        YOUVERIFY_API_VERSION,
        YOUVERIFY_FACIAL_COMPARISON_URL,
      );

      console.info('facialComparisonUrl %s', facialComparisonUrl);

      const facialComparisonRequest: YouVerifyFacialComparisonRequest = {
        image1: input.data.imageOne,
        image2: input.data!.imageTwo,
        isSubjectConsent: true,
      };

      console.info('facialComparisonRequest \n %o', facialComparisonRequest);

      const facialComparisonResponse: YouVerifyResponseModel<YouVerifyFacialComparisonResponse> =
        (
          await RequestUtil.makePostRequest(
            facialComparisonUrl,
            facialComparisonRequest,
            YouVerifyProvider.REQUEST_HEADER,
          )
        ).data;

      console.info('facialComparisonResponse \n %o', facialComparisonResponse);

      if (!facialComparisonResponse.success) {
        return this.getVerificationErrorResponse(facialComparisonResponse);
      }

      if (!facialComparisonResponse.data.imageComparison.match) {
        return new VerificationProviderResponse(
          VerificationStatus.FAILED,
          facialComparisonResponse.message || 'No match.',
        );
      }

      return new VerificationProviderResponse(
        VerificationStatus.SUCCESS,
        'Verification Successful.',
        facialComparisonResponse.data,
      );
    } catch (error) {
      console.error(
        'YouVerifyProvider :: compareFaces() error \n %o',
        {
          statusText: error.response.statusText,
          statusMessage: error.response.data,
        },
        this.getVerificationErrorResponse(error),
      );
      return this.getVerificationErrorResponse(error);
    }
  }

  private static buildVerificationPayload(
    verifyDocumentDTO?: VerifyDocumentDTO<any>,
  ): YouVerifyGenericVerificationRequest {
    const verificationPayload: YouVerifyGenericVerificationRequest = {
      id: verifyDocumentDTO.identifier,
      isSubjectConsent: true,
      validations: {
        data: {},
      },
    };

    if (verifyDocumentDTO.firstName) {
      verificationPayload.validations.data.firstName =
        verifyDocumentDTO.firstName;
    }

    if (verifyDocumentDTO.lastName) {
      verificationPayload.validations.data.lastName =
        verifyDocumentDTO.lastName;
    }

    if (verifyDocumentDTO.dob) {
      verificationPayload.validations.data.dateOfBirth = verifyDocumentDTO.dob;
    }

    return verificationPayload;
  }

  private static buildNinVerificationPayload(
    verifyDocumentDTO?: VerifyDocumentDTO<VerifyNinDTO>,
  ) {
    const verificationPayload: YouVerifyGenericVerificationRequest = {
      id: verifyDocumentDTO.identifier,
      isSubjectConsent: true,
      validations: {
        data: {},
        selfie: {
          image: null,
        },
      },
    };

    if (verifyDocumentDTO.firstName) {
      verificationPayload.validations.data.firstName =
        verifyDocumentDTO.firstName;
    }

    if (verifyDocumentDTO.lastName) {
      verificationPayload.validations.data.lastName =
        verifyDocumentDTO.lastName;
    }

    if (verifyDocumentDTO.dob) {
      verificationPayload.validations.data.dateOfBirth = verifyDocumentDTO.dob;
    }

    if (verifyDocumentDTO.data.selfie) {
      verificationPayload.validations.selfie.image =
        verifyDocumentDTO.data.selfie;
    }

    return verificationPayload;
  }
}

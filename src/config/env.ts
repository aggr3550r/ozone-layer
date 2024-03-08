export const YOUVERIFY_VERIFY_BVN_URL = String(
  process.env.YOUVERIFY_VERIFY_BVN_URL || '/api/identity/ng/bvn',
);

export const YOUVERIFY_BASE_URL = String(
  process.env.YOUVERIFY_BASE_URL || 'https://api.sandbox.youverify.co',
);

export const YOUVERIFY_VERIFY_NIN_URL = String(
  process.env.YOUVERIFY_VERIFY_NIN_URL || '/api/identity/ng/nin',
);

export const YOUVERIFY_VERIFY_PVC_URL = String(
  process.env.YOUVERIFY_VERIFY_PVC_URL || '/api/identity/ng/pvc',
);

export const YOUVERIFY_VERIFY_INTL_PASSPORT_URL = String(
  process.env.YOUVERIFY_VERIFY_INTL_PASSPORT_URL || '',
);

export const YOUVERIFY_VERIFY_DRIVERS_LICENSE_URL = String(
  process.env.YOUVERIFY_VERIFY_DRIVERS_LICENSE_URL || '',
);

export const YOUVERIFY_FACIAL_COMPARISON_URL = String(
  process.env.YOUVERIFY_FACIAL_COMPARISON_URL || '',
);

export const YOUVERIFY_API_VERSION = String(
  process.env.YOUVERIFY_API_VERSION || 'v2/',
);

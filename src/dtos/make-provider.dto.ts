import { IMakeRepositoryType } from '../interfaces/factory/IMakeRepositoryType';
import { IMakeServiceType } from '../interfaces/factory/IMakeServiceType';
import { IMakeVerificationProviderType } from '../interfaces/factory/IMakeVerificationProviderType';

export interface MakeProviderDTO
  extends IMakeServiceType,
    IMakeRepositoryType,
    IMakeVerificationProviderType {}

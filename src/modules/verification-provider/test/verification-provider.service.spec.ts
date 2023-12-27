import { Test, TestingModule } from '@nestjs/testing';
import { VerificationProviderService } from './verification-provider.service';

describe('VerificationProviderService', () => {
  let service: VerificationProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationProviderService],
    }).compile();

    service = module.get<VerificationProviderService>(VerificationProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

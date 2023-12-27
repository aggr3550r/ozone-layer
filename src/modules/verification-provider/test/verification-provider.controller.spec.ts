import { Test, TestingModule } from '@nestjs/testing';
import { VerificationProviderController } from './verification-provider.controller';

describe('VerificationProviderController', () => {
  let controller: VerificationProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationProviderController],
    }).compile();

    controller = module.get<VerificationProviderController>(VerificationProviderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PublicMediaHelperService } from './public-media-helper.service';

describe('PublicMediaHelperService', () => {
  let service: PublicMediaHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicMediaHelperService],
    }).compile();

    service = module.get<PublicMediaHelperService>(PublicMediaHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

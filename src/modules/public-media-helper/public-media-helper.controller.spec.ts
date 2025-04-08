import { Test, TestingModule } from '@nestjs/testing';
import { PublicMediaHelperController } from './public-media-helper.controller';

describe('PublicMediaHelperController', () => {
  let controller: PublicMediaHelperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicMediaHelperController],
    }).compile();

    controller = module.get<PublicMediaHelperController>(
      PublicMediaHelperController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

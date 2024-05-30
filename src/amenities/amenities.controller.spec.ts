import { Test, TestingModule } from '@nestjs/testing';
import { AmenityController } from './amenities.controller';
import { AmenityService } from './amenities.service';

describe('AmenitiesController', () => {
  let controller: AmenityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmenityController],
      providers: [AmenityService],
    }).compile();

    controller = module.get<AmenityController>(AmenityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

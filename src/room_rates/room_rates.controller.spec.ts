import { Test, TestingModule } from '@nestjs/testing';
import { RoomRatesController } from './room_rates.controller';
import { RoomRatesService } from './room_rates.service';

describe('RoomRatesController', () => {
  let controller: RoomRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomRatesController],
      providers: [RoomRatesService],
    }).compile();

    controller = module.get<RoomRatesController>(RoomRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

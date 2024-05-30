import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypesController } from './room_types.controller';
import { RoomTypeService } from './room_types.service';

describe('RoomTypesController', () => {
  let controller: RoomTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomTypesController],
      providers: [RoomTypeService],
    }).compile();

    controller = module.get<RoomTypesController>(RoomTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

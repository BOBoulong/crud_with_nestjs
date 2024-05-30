import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRate } from './entities/room_rate.entity';
import { RoomType } from 'src/room_types/entities/room_type.entity';
import { RoomRateService } from './room_rates.service';
import { RoomRateController } from './/room_rates.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRate, RoomType])],
  controllers: [RoomRateController],
  providers: [RoomRateService],
})
export class RoomRatesModule {}

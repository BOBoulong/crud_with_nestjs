import { Module } from '@nestjs/common';
import { HotelDetailsService } from './hotel_details.service';
import { HotelDetailsController } from './hotel_details.controller';

@Module({
  controllers: [HotelDetailsController],
  providers: [HotelDetailsService],
})
export class HotelDetailsModule {}

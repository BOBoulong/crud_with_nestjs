import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelDetail } from './entities/hotel_detail.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { HotelDetailsService } from './hotel_details.service';
import { HotelDetailsController } from './hotel_details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HotelDetail, Hotel])],
  providers: [HotelDetailsService],
  controllers: [HotelDetailsController],
})
export class HotelDetailsModule {}

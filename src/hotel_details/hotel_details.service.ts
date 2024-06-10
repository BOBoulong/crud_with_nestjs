import { Injectable } from '@nestjs/common';
import { CreateHotelDetailDto } from './dto/create-hotel_detail.dto';
import { UpdateHotelDetailDto } from './dto/update-hotel_detail.dto';

@Injectable()
export class HotelDetailsService {
  create(createHotelDetailDto: CreateHotelDetailDto) {
    return 'This action adds a new hotelDetail';
  }

  findAll() {
    return `This action returns all hotelDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelDetail`;
  }

  update(id: number, updateHotelDetailDto: UpdateHotelDetailDto) {
    return `This action updates a #${id} hotelDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelDetail`;
  }
}

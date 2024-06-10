import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelDetailsService } from './hotel_details.service';
import { CreateHotelDetailDto } from './dto/create-hotel_detail.dto';
import { UpdateHotelDetailDto } from './dto/update-hotel_detail.dto';

@Controller('hotel-details')
export class HotelDetailsController {
  constructor(private readonly hotelDetailsService: HotelDetailsService) {}

  @Post()
  create(@Body() createHotelDetailDto: CreateHotelDetailDto) {
    return this.hotelDetailsService.create(createHotelDetailDto);
  }

  @Get()
  findAll() {
    return this.hotelDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDetailDto: UpdateHotelDetailDto) {
    return this.hotelDetailsService.update(+id, updateHotelDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelDetailsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async create(@Body(ValidationPipe) createHotelDto: CreateHotelDto) {
    const createHotel = await this.hotelsService.create(createHotelDto);
    return {
      statusCode: 201,
      message: 'Hotel created successfully',
      data: createHotel,
    };
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hotelsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateHotelDto: UpdateHotelDto,
  ) {
    const updateHotel = await this.hotelsService.update(id, updateHotelDto);
    return {
      statusCode: 200,
      message: `Hotel id ${id} updated successfully`,
      data: updateHotel,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.hotelsService.remove(id);
    return {
      statusCode: 200,
      message: `Hotel id ${id} deleted successfully`,
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Numeric string for hotel id is not excepted. Id must be a number',
      );
    }
    return val;
  }
}
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  async create(@Body() createHotelDto: CreateHotelDto) {
    const createHotel = await this.hotelsService.create(createHotelDto);
    return {
      statusCode: 201,
      message: 'Hotel created successfully',
      data: createHotel,
    };
  }

  @Get()
  async getPagination(
    @Query() paginationDto: PaginationDto,
    @Query() advancedSearchDto: AdvancedSearchDto,
  ) {
    const hotel = await this.hotelsService.getPagination(
      paginationDto,
      advancedSearchDto,
    );
    return {
      statusCode: 200,
      message: 'Hotels fetched successfully',
      data: hotel,
    };
  }

  @Get(':id')
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    try {
      return await this.hotelsService.findOne(id);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHotelDto: UpdateHotelDto,
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
      statusCode: 204,
      message: `Hotel id ${id} deleted successfully`,
    };
  }
}

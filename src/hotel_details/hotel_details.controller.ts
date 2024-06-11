import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  BadRequestException,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HotelDetailsService } from './hotel_details.service';
import { CreateHotelDetailDto } from './dto/create-hotel_detail.dto';
import { UpdateHotelDetailDto } from './dto/update-hotel_detail.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearch } from './dto/advanced-search.dto';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Numeric string for Hotel Detail id is not excepted. Id must be a number',
      );
    }
    return val;
  }
}
@Controller('hotel-details')
export class HotelDetailsController {
  constructor(private readonly hotelDetailService: HotelDetailsService) {}

  @Post()
  async create(@Body() createHotelDetailDto: CreateHotelDetailDto) {
    const createdHotelDetail =
      await this.hotelDetailService.create(createHotelDetailDto);
    return {
      statusCode: 201,
      message: 'Hotel Detail created successfully.',
      data: createdHotelDetail,
    };
  }

  @Get()
  async getPagination(
    @Query() paginationDto: PaginationDto,
    @Query() advancedSearchDto: AdvancedSearch,
  ) {
    const HotelDetail = await this.hotelDetailService.getPagination(
      paginationDto,
      advancedSearchDto,
    );
    return {
      statusCode: 200,
      message: 'Hotel Detail fetched successfully',
      data: HotelDetail,
    };
  }

  @Get(':id')
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    try {
      return await this.hotelDetailService.findOne(id);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException('Hotel Detail not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHotelDetailDto: UpdateHotelDetailDto,
  ) {
    const updatedHotelDetail = await this.hotelDetailService.update(
      id,
      updateHotelDetailDto,
    );
    return {
      statusCode: 200,
      message: `Hotel Detail ID ${id} updated successfully.`,
      data: updatedHotelDetail,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.hotelDetailService.remove(id);
    return {
      statusCode: 200,
      message: `Hotel Detail ID ${id} deleted successfully.`,
    };
  }
}

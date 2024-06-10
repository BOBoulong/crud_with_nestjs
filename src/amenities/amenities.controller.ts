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
import { AmenityService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Numeric string for amenity id is not excepted. Id must be a number',
      );
    }
    return val;
  }
}
@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post()
  async create(@Body() createAmenityDto: CreateAmenityDto) {
    const createdAmenity = await this.amenityService.create(createAmenityDto);
    return {
      statusCode: 201,
      message: 'Amenity created successfully.',
      data: createdAmenity,
    };
  }

  @Get()
  async getPagination(
    @Query() paginationDto: PaginationDto,
    @Query() advancedSearchDto: AdvancedSearchDto,
  ) {
    const amenity = await this.amenityService.getPagination(
      paginationDto,
      advancedSearchDto,
    );
    return {
      statusCode: 200,
      message: 'Amenities fetched successfully',
      data: amenity,
    };
  }

  @Get(':id')
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    try {
      return await this.amenityService.findOne(id);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException('Amenity not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAmenityDto: UpdateAmenityDto,
  ) {
    const updatedAmenity = await this.amenityService.update(
      id,
      updateAmenityDto,
    );
    return {
      statusCode: 200,
      message: `Amenity ID ${id} updated successfully.`,
      data: updatedAmenity,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.amenityService.remove(id);
    return {
      statusCode: 200,
      message: `Amenity ID ${id} deleted successfully.`,
    };
  }
}

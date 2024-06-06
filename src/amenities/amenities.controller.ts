import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AmenityService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post()
  async create(@Body(ValidationPipe) createAmenityDto: CreateAmenityDto) {
    const createdAmenity = await this.amenityService.create(createAmenityDto);
    return {
      statusCode: 201,
      message: 'Amenity created successfully.',
      data: createdAmenity,
    };
  }

  @Get()
  async getPagination(
    @Query(ValidationPipe) paginationDto: PaginationDto,
    @Query(ValidationPipe) advancedSearchDto: AdvancedSearchDto,
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
  async findOne(@Param('id') id: number) {
    const amenity = await this.amenityService.findOne(id);
    return {
      statusCode: 200,
      message: `Amenity fetched successfully.`,
      data: amenity,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateAmenityDto: UpdateAmenityDto,
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

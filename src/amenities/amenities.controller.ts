import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
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
import { ok, created, badRequest, notFound } from '../utils/http-status.util';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw badRequest(
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
    return created('Amenity created successfully.', createdAmenity);
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
    return ok('Amenities fetched successfully', amenity);
  }

  @Get(':id')
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    try {
      const amenity = await this.amenityService.findOne(id);
      return ok('Amenity fetched successfully', amenity);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        return notFound('Amenity not found');
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() updateAmenityDto: UpdateAmenityDto,
  ) {
    const updatedAmenity = await this.amenityService.update(
      id,
      updateAmenityDto,
    );
    return ok(`Amenity ID ${id} updated successfully.`, updatedAmenity);
  }

  @Delete(':id')
  async remove(@Param('id', CustomParseIntPipe) id: number) {
    await this.amenityService.remove(id);
    return ok(`Amenity ID ${id} deleted successfully.`);
  }
}

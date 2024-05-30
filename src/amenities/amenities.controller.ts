import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { AmenityService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';

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
  async findAll() {
    return this.amenityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.amenityService.findOne(id);
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
      message: `Amenity id ${id} updated successfully.`,
      data: updatedAmenity,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.amenityService.remove(id);
    return {
      statusCode: 200,
      message: `Amenity id ${id} deleted successfully.`,
    };
  }
}

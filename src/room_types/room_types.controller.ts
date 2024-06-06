import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RoomTypeService } from './room_types.service';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypesService: RoomTypeService) {}

  @Post()
  async create(@Body(ValidationPipe) createRoomTypeDto: CreateRoomTypeDto) {
    const roomType = await this.roomTypesService.create(createRoomTypeDto);
    return {
      statusCode: 201,
      message: 'Room Type created successfully',
      data: roomType,
    };
  }

  @Get()
  async getPagination(
    @Query(ValidationPipe) paginationDto: PaginationDto,
    @Query(ValidationPipe) advancedSearchDto: AdvancedSearchDto,
  ) {
    const roomType = await this.roomTypesService.getPagination(
      paginationDto,
      advancedSearchDto,
    );
    return {
      statusCode: 200,
      message: 'Room Type fetched successfully',
      data: roomType,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const roomType = await this.roomTypesService.findOne(id);
    return {
      statusCode: 200,
      message: `Room Type Id ${id} fetched successfully`,
      data: roomType,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    const roomType = await this.roomTypesService.update(id, updateRoomTypeDto);
    return {
      statusCode: 200,
      message: 'Room Type updated successfully',
      data: roomType,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.roomTypesService.remove(id);
    return { statusCode: 200, message: 'Room Type deleted successfully.' };
  }
}

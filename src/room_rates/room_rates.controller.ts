import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { RoomRateService } from './room_rates.service';
import { CreateRoomRateDto } from './dto/create-room_rate.dto';
import { UpdateRoomRateDto } from './dto/update-room_rate.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Controller('room-rates')
export class RoomRateController {
  constructor(private readonly roomRateService: RoomRateService) {}

  @Post()
  async create(@Body(ValidationPipe) createRoomRateDto: CreateRoomRateDto) {
    const roomRate = await this.roomRateService.create(createRoomRateDto);
    return {
      statusCode: 201,
      message: 'Room rate created successfully',
      data: roomRate,
    };
  }

  @Get()
  async getPagination(
    @Query(ValidationPipe) paginationDto: PaginationDto,
    @Query(ValidationPipe) advancedSearchDto: AdvancedSearchDto,
  ) {
    const roomRate = await this.roomRateService.getPagination(
      paginationDto,
      advancedSearchDto,
    );
    return {
      statusCode: 200,
      message: 'Room rates fetched successfully',
      data: roomRate,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const roomRate = await this.roomRateService.findOne(id);
    return {
      statusCode: 200,
      message: 'Room rate fetched successfully',
      data: roomRate,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateRoomRateDto: UpdateRoomRateDto,
  ) {
    const roomRate = await this.roomRateService.update(id, updateRoomRateDto);
    return {
      statusCode: 200,
      message: 'Room rate updated successfully',
      data: roomRate,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.roomRateService.remove(id);
    return {
      statusCode: 200,
      message: 'Room rate deleted successfully',
    };
  }
}

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
import { RoomService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body(ValidationPipe) createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  async getPagination(
    @Query(ValidationPipe) paginationDto: PaginationDto,
    @Query(ValidationPipe) advancedSearchDto: AdvancedSearchDto,
  ) {
    const rooms = await this.roomService.getPagination(
      paginationDto,
      advancedSearchDto,
    );
    return {
      statusCode: 200,
      message: 'Rooms fetched successfully',
      data: rooms,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.roomService.remove(id);
  }
}

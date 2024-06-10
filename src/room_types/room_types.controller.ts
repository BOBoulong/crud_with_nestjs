import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Injectable,
  BadRequestException,
  PipeTransform,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RoomTypeService } from './room_types.service';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Numeric string for room type id is not excepted. Id must be a number',
      );
    }
    return val;
  }
}
@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypesService: RoomTypeService) {}

  @Post()
  async create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    const roomType = await this.roomTypesService.create(createRoomTypeDto);
    return {
      statusCode: 201,
      message: 'Room Type created successfully',
      data: roomType,
    };
  }

  @Get()
  async getPagination(
    @Query() paginationDto: PaginationDto,
    @Query() advancedSearchDto: AdvancedSearchDto,
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
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    try {
      return await this.roomTypesService.findOne(id);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException('Room type not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
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

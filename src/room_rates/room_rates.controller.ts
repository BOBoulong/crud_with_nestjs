import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  Query,
  BadRequestException,
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoomRateService } from './room_rates.service';
import { CreateRoomRateDto } from './dto/create-room_rate.dto';
import { UpdateRoomRateDto } from './dto/update-room_rate.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Numeric string for room rate id is not excepted. Id must be a number',
      );
    }
    return val;
  }
}
@Controller('room-rates')
export class RoomRateController {
  constructor(private readonly roomRateService: RoomRateService) {}

  @Post()
  async create(@Body() createRoomRateDto: CreateRoomRateDto) {
    const roomRate = await this.roomRateService.create(createRoomRateDto);
    return {
      statusCode: 201,
      message: 'Room rate created successfully',
      data: roomRate,
    };
  }

  @Get()
  async getPagination(
    @Query() paginationDto: PaginationDto,
    @Query() advancedSearchDto: AdvancedSearchDto,
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
  async findOne(@Param('id', CustomParseIntPipe) id: number) {
    try {
      return await this.roomRateService.findOne(id);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        throw new HttpException('Room rate not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRoomRateDto: UpdateRoomRateDto,
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

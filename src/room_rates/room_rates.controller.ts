import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { RoomRateService } from './room_rates.service';
import { CreateRoomRateDto } from './dto/create-room_rate.dto';
import { UpdateRoomRateDto } from './dto/update-room_rate.dto';

@Controller('room-rates')
export class RoomRateController {
  constructor(private readonly roomRateService: RoomRateService) {}

  @Post()
  async create(@Body(ValidationPipe) createRoomRateDto: CreateRoomRateDto) {
    return this.roomRateService.create(createRoomRateDto);
  }

  @Get()
  async findAll() {
    return this.roomRateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.roomRateService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateRoomRateDto: UpdateRoomRateDto,
  ) {
    return this.roomRateService.update(id, updateRoomRateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.roomRateService.remove(id);
  }
}

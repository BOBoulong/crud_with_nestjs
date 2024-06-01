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
import { RoomTypeService } from './room_types.service';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';

@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  create(@Body(ValidationPipe) createRoomTypeDto: CreateRoomTypeDto) {
    return this.roomTypeService.create(createRoomTypeDto);
  }

  @Get()
  findAll() {
    return this.roomTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    return this.roomTypeService.update(+id, updateRoomTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomTypeService.remove(+id);
  }
}

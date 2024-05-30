import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomRate } from './entities/room_rate.entity';
import { CreateRoomRateDto } from './dto/create-room_rate.dto';
import { UpdateRoomRateDto } from './dto/update-room_rate.dto';
import { RoomType } from 'src/room_types/entities/room_type.entity';

@Injectable()
export class RoomRateService {
  constructor(
    @InjectRepository(RoomRate)
    private roomRateRepository: Repository<RoomRate>,
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
  ) {}

  async create(createRoomRateDto: CreateRoomRateDto): Promise<RoomRate> {
    const roomType = await this.roomTypeRepository.findOne({
      where: { id: createRoomRateDto.room_type_id },
    });
    if (!roomType)
      throw new NotFoundException(
        `RoomType with ID ${createRoomRateDto.room_type_id} not found`,
      );

    const roomRate = this.roomRateRepository.create({
      ...createRoomRateDto,
      roomType,
    });
    return this.roomRateRepository.save(roomRate);
  }

  async findAll(): Promise<RoomRate[]> {
    return this.roomRateRepository.find({ relations: ['roomType'] });
  }

  async findOne(id: number): Promise<RoomRate> {
    const roomRate = await this.roomRateRepository.findOne({
      where: { id },
      relations: ['roomType'],
    });
    if (!roomRate)
      throw new NotFoundException(`RoomRate with ID ${id} not found`);
    return roomRate;
  }

  async update(
    id: number,
    updateRoomRateDto: UpdateRoomRateDto,
  ): Promise<RoomRate> {
    const roomRate = await this.roomRateRepository.findOne({
      where: { id },
      relations: ['roomType'],
    });
    if (!roomRate)
      throw new NotFoundException(`RoomRate with ID ${id} not found`);

    if (updateRoomRateDto.room_type_id) {
      const roomType = await this.roomTypeRepository.findOne({
        where: { id: updateRoomRateDto.room_type_id },
      });
      if (!roomType)
        throw new NotFoundException(
          `RoomType with ID ${updateRoomRateDto.room_type_id} not found`,
        );
      roomRate.roomType = roomType;
    }

    Object.assign(roomRate, updateRoomRateDto);
    return this.roomRateRepository.save(roomRate);
  }

  async remove(id: number): Promise<void> {
    const roomRate = await this.roomRateRepository.findOne({ where: { id } });
    if (!roomRate)
      throw new NotFoundException(`RoomRate with ID ${id} not found`);
    await this.roomRateRepository.remove(roomRate);
  }
}

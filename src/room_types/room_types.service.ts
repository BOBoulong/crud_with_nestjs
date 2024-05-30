import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from './entities/room_type.entity';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';
import { Hotel } from '../hotels/entities/hotel.entity';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async create(createRoomTypeDto: CreateRoomTypeDto): Promise<RoomType> {
    const hotel = await this.hotelRepository.findOne({
      where: { id: createRoomTypeDto.hotel_id },
    });
    if (!hotel) {
      throw new NotFoundException(
        `Hotel with ID ${createRoomTypeDto.hotel_id} not found`,
      );
    }

    const roomType = this.roomTypeRepository.create({
      ...createRoomTypeDto,
      hotel,
    });
    return this.roomTypeRepository.save(roomType);
  }

  async findAll(): Promise<RoomType[]> {
    return this.roomTypeRepository.find({ relations: ['hotel'] });
  }

  async findOne(id: number): Promise<RoomType> {
    const roomType = await this.roomTypeRepository.findOne({
      where: { id },
      relations: ['hotel'],
    });
    if (!roomType) {
      throw new NotFoundException(`RoomType with ID ${id} not found`);
    }
    return roomType;
  }

  async update(
    id: number,
    updateRoomTypeDto: UpdateRoomTypeDto,
  ): Promise<RoomType> {
    const roomType = await this.roomTypeRepository.findOne({
      where: { id },
      relations: ['hotel'],
    });
    if (!roomType) {
      throw new NotFoundException(`RoomType with ID ${id} not found`);
    }

    if (updateRoomTypeDto.hotel_id) {
      const hotel = await this.hotelRepository.findOne({
        where: { id: updateRoomTypeDto.hotel_id },
      });
      if (!hotel) {
        throw new NotFoundException(
          `Hotel with ID ${updateRoomTypeDto.hotel_id} not found`,
        );
      }
      roomType.hotel = hotel;
    }
    Object.assign(roomType, updateRoomTypeDto);
    return this.roomTypeRepository.save(roomType);
  }

  async remove(id: number): Promise<void> {
    const roomType = await this.roomTypeRepository.findOne({ where: { id } });
    if (!roomType) {
      throw new NotFoundException(`RoomType with ID ${id} not found`);
    }
    await this.roomTypeRepository.remove(roomType);
  }
}

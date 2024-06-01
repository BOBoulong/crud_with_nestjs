import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoomType } from './entities/room_type.entity';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';
import { Hotel } from '../hotels/entities/hotel.entity';
import { Amenity } from '../amenities/entities/amenity.entity';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
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

    const amenities = await this.amenityRepository.findBy({
      id: In(createRoomTypeDto.amenities),
    });
    const roomType = this.roomTypeRepository.create({
      ...createRoomTypeDto,
      hotel,
      amenities,
    });
    return this.roomTypeRepository.save(roomType);
  }

  async findAll(): Promise<RoomType[]> {
    return this.roomTypeRepository.find({
      relations: ['hotel', 'amenities', 'rooms'],
    });
  }

  async findOne(id: number): Promise<RoomType> {
    const roomType = await this.roomTypeRepository.findOne({
      where: { id },
      relations: ['hotel', 'amenities', 'rooms'],
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
    const amenities = await this.amenityRepository.findBy({
      id: In(updateRoomTypeDto.amenities || []),
    });
    await this.roomTypeRepository.update(id, {
      ...updateRoomTypeDto,
      amenities,
    });
    const updatedRoomType = await this.findOne(id);
    return updatedRoomType;
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`RoomType with ID ${id} not found`);
    }
  }
}

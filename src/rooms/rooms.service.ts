import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomType } from 'src/room_types/entities/room_type.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
    @InjectRepository(Hotel) private hotelRepository: Repository<Hotel>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const roomType = await this.roomTypeRepository.findOne({
      where: { id: createRoomDto.room_type_id },
    });
    if (!roomType)
      throw new NotFoundException(
        `RoomType with ID ${createRoomDto.room_type_id} not found`,
      );

    const hotel = await this.hotelRepository.findOne({
      where: { id: createRoomDto.hotel_id },
    });
    if (!hotel)
      throw new NotFoundException(
        `Hotel with ID ${createRoomDto.hotel_id} not found`,
      );

    const room = this.roomRepository.create({
      ...createRoomDto,
      roomType,
      hotel,
    });
    return this.roomRepository.save(room);
  }
  async getPagination(
    paginationDto: PaginationDto,
    advancedSearchDto: AdvancedSearchDto,
  ): Promise<{ data: Room[]; total: number; limit: number }> {
    const { page, limit, sortField, sortOrder } = paginationDto;
    const { name, floor } = advancedSearchDto;

    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.roomType', 'roomType')
      .leftJoinAndSelect('room.hotel', 'hotel');

    if (name) {
      query.andWhere('room.name ILIKE :name', { name: `%${name}%` });
    }

    if (floor !== undefined) {
      query.andWhere('room.floor = :floor', { floor });
    }

    if (sortField && sortOrder) {
      query.orderBy(`room.${sortField}`, sortOrder);
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, limit };
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['roomType', 'hotel'],
    });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['roomType', 'hotel'],
    });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);

    if (updateRoomDto.room_type_id) {
      const roomType = await this.roomTypeRepository.findOne({
        where: { id: updateRoomDto.room_type_id },
      });
      if (!roomType)
        throw new NotFoundException(
          `RoomType with ID ${updateRoomDto.room_type_id} not found`,
        );
      room.roomType = roomType;
    }

    if (updateRoomDto.hotel_id) {
      const hotel = await this.hotelRepository.findOne({
        where: { id: updateRoomDto.hotel_id },
      });
      if (!hotel)
        throw new NotFoundException(
          `Hotel with ID ${updateRoomDto.hotel_id} not found`,
        );
      room.hotel = hotel;
    }

    Object.assign(room, updateRoomDto);
    return this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);
    await this.roomRepository.remove(room);
  }
}

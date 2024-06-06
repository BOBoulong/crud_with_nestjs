import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}
  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async getPagination(
    PaginationDto: PaginationDto,
    advancedSearchDto: AdvancedSearchDto,
  ): Promise<{ data: Hotel[]; total: number; limit: number }> {
    const { page, limit, sortField, sortOrder } = PaginationDto;
    const { name } = advancedSearchDto;

    const query = this.hotelRepository.createQueryBuilder('hotel');

    if (name) {
      query.andWhere('hotel.name ILIKE :name', { name: `%${name}%` });
    }

    if (sortField && sortOrder) {
      query.orderBy(`hotel.${sortField}`, sortOrder);
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, limit };
  }

  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOneBy({ id });
    if (!hotel) {
      throw new NotFoundException(`Hotel id ${id} not found`);
    }
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    await this.hotelRepository.update(id, updateHotelDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.hotelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hotel id ${id} not found`);
    }
  }
}

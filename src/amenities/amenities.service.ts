import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from './entities/amenity.entity';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AdvancedSearchDto } from './dto/advanced-search.dto';

@Injectable()
export class AmenityService {
  constructor(
    @InjectRepository(Amenity)
    private readonly amenityRepository: Repository<Amenity>,
  ) {}

  async create(createAmenityDto: CreateAmenityDto): Promise<Amenity> {
    const amenity = this.amenityRepository.create(createAmenityDto);
    return this.amenityRepository.save(amenity);
  }

  async getPagination(
    paginationDto: PaginationDto,
    advancedSearchDto: AdvancedSearchDto,
  ): Promise<{ data: Amenity[]; total: number; limit: number }> {
    const { page, limit, sortField, sortOrder } = paginationDto;
    const { name, group, has_extra_charge, description } = advancedSearchDto;

    const query = this.amenityRepository.createQueryBuilder('amenity');

    if (name) {
      query.andWhere('amenity.name ILIKE :name', { name: `%${name}%` });
    }

    if (group) {
      query.andWhere('amenity.group ILIKE :group', { group: `%${group}%` });
    }

    if (has_extra_charge) {
      query.andWhere('amenity.has_extra_charge = :has_extra_charge', {
        has_extra_charge,
      });
    }

    if (description) {
      query.andWhere('amenity.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    if (sortField && sortOrder) {
      query.orderBy(`amenity.${sortField}`, sortOrder);
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, limit };
  }

  async findOne(id: number): Promise<Amenity> {
    const amenity = await this.amenityRepository.findOneBy({ id });
    if (!amenity) {
      throw new NotFoundException(`Amenity with ID ${id} not found`);
    }
    return amenity;
  }

  async update(
    id: number,
    updateAmenityDto: UpdateAmenityDto,
  ): Promise<Amenity> {
    await this.amenityRepository.update(id, updateAmenityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.amenityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Amenity with ID ${id} not found`);
    }
  }
}

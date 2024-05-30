import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from './entities/amenity.entity';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';

@Injectable()
export class AmenityService {
  constructor(
    @InjectRepository(Amenity)
    private readonly amenityRepository: Repository<Amenity>,
  ) {}

  async create(createAmenityDto: CreateAmenityDto): Promise<Amenity> {
    const amenity = await this.amenityRepository.create(createAmenityDto);
    return this.amenityRepository.save(amenity);
  }

  async findAll(): Promise<Amenity[]> {
    return this.amenityRepository.find();
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

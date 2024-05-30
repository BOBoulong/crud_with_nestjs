import { Module } from '@nestjs/common';
import { AmenityService } from './amenities.service';
import { AmenityController } from './amenities.controller';
import { Amenity } from './entities/amenity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  controllers: [AmenityController],
  providers: [AmenityService],
})
export class AmenitiesModule {}

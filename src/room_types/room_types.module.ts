import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { RoomTypeService } from './room_types.service';
import { RoomTypeController } from './room_types.controller';
import { Amenity } from 'src/amenities/entities/amenity.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType, Amenity, Hotel])],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
})
export class RoomTypesModule {}

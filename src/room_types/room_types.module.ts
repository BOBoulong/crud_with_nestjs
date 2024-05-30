import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room_type.entity';
import { RoomTypeService } from './room_types.service';
import { RoomTypeController } from './room_types.controller';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType]), HotelsModule],
  providers: [RoomTypeService],
  controllers: [RoomTypeController],
})
export class RoomTypesModule {}

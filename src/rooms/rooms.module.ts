import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomService } from './rooms.service';
import { RoomController } from './rooms.controller';
import { RoomType } from '../room_types/entities/room_type.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomType, Hotel])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomsModule {}

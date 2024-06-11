import { HotelDetail } from 'src/hotel_details/entities/hotel_detail.entity';
import { RoomType } from 'src/room_types/entities/room_type.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => RoomType, (roomType) => roomType.hotel)
  roomTypes: RoomType[];
  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];
  @OneToOne(() => HotelDetail, (hotelDetail) => hotelDetail.hotel, {
    cascade: true,
  })
  hotelDetail: HotelDetail;
}

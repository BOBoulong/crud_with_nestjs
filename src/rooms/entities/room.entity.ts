import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoomType } from 'src/room_types/entities/room_type.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: true })
  floor: number;

  @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  @JoinColumn({ name: 'room_type_id' })
  roomType: RoomType;

  @ManyToOne(() => Hotel, (hotel) => hotel.roomTypes)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
}

import { Amenity } from 'src/amenities/entities/amenity.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 1, nullable: false })
  capacity_adult: number;

  @Column({ type: 'int', nullable: true })
  capacity_children: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Hotel, (hotel) => hotel.roomTypes)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];

  @ManyToMany(() => Amenity, { cascade: true })
  @JoinTable()
  amenities: Amenity[];
}

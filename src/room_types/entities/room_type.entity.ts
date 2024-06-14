import { Amenity } from 'src/amenities/entities/amenity.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { RoomRate } from 'src/room_rates/entities/room_rate.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { BaseEntity } from '../../baseEntity/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RoomType extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'capacity_adult', type: 'int', default: 1, nullable: false })
  capacityAdult: number;

  @Column({ name: 'capacity_children', type: 'int', nullable: true })
  capacityChildren: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.roomTypes)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];

  @OneToMany(() => RoomRate, (roomRate) => roomRate.roomType)
  roomRates: RoomRate[];

  @ManyToMany(() => Amenity, { cascade: true })
  @JoinTable()
  amenities: Amenity[];
  id: any;
}

import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../baseEntity/base.entity';
import { Hotel } from '../../hotels/entities/hotel.entity';

@Entity()
export class HotelDetail extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @OneToOne(() => Hotel, (hotel) => hotel.hotelDetail)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
}

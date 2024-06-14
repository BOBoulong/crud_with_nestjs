import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../baseEntity/base.entity';
import { RoomType } from 'src/room_types/entities/room_type.entity';

@Entity()
export class RoomRate extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ name: 'default_rate', type: 'decimal', nullable: false })
  defaultRate: number;

  @Column({ name: 'weekend_rate', type: 'decimal', nullable: true })
  weekendRate: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => RoomType, (roomType) => roomType.roomRates)
  @JoinColumn({ name: 'room_type_id' })
  roomType: RoomType;
}

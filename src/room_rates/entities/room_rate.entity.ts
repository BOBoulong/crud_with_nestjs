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

@Entity()
export class RoomRate {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => RoomType, (roomType) => roomType.id)
  @JoinColumn({ name: 'room_type_id' })
  roomType: RoomType;
}

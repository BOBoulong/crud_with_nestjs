import { RoomType } from 'src/room_types/entities/room_type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  group: string;

  @Column({ name: 'has_extra_charge', default: false })
  hasExtraCharge: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => RoomType, (roomType) => roomType.amenities)
  roomTypes: RoomType[];
}

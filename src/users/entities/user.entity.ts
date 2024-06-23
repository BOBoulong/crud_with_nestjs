import { BaseEntity } from 'src/baseEntity/base.entity';
import { Column, Entity } from 'typeorm';

Entity();
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ name: 'is_active', default: false })
  isActive: boolean;
}

import { CommonEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends CommonEntity {
  @Column()
  roleName: string;

  @Column('text', { array: true })
  permissions: string[];
}

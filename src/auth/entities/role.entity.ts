import { CommonEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique('role-unique-index', ['roleName'])
export class Role extends CommonEntity {
  @Column()
  roleName: string;

  @Column('text', { array: true })
  permissions: string[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

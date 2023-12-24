import { CommonEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Role } from './role.entity';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique('email-unique-index', ['emailAddress'])
export class User extends CommonEntity {
  @Column()
  emailAddress: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

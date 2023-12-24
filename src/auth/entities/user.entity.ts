import { CommonEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  emailAddress: string;

  @Column()
  password: string;
}

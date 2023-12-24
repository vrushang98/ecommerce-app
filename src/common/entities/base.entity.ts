import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn('timestamp')
  createdAt: Date;

  @CreateDateColumn('timestamp')
  updatedAt: Date;
}

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar'
  })
  name: string

  @Column({
    type: 'text'
  })
  description: string

  @ManyToOne(() => User, user => user.projects, {
    cascade: true
  })
  creator: User

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: string
}

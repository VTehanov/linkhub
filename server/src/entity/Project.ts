import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from './User'
import { Tag } from './Tag'

export enum ProgressStatusEnum {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'In progress'
}

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

  @Column({
    type: 'enum',
    enum: ProgressStatusEnum,
    default: ProgressStatusEnum.NOT_STARTED
  })
  progressStatus: ProgressStatusEnum

  @ManyToOne(() => User, (creator: User) => creator.projects, {
    cascade: true
  })
  creator: User

  @ManyToMany(() => Tag, tag => tag.projects)
  @JoinTable()
  tags: Tag[]

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: string
}

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany
} from 'typeorm'
import { Project } from './Project'

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @ManyToMany(() => Project, (project: Project) => project.tags)
  projects: Project[]
}

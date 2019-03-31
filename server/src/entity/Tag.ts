import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BeforeInsert
} from 'typeorm'
import slugify from 'slugify'
import { Project } from './Project'

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  slug: string

  @ManyToMany(() => Project, (project: Project) => project.tags)
  projects: Project[]

  @BeforeInsert()
  slugifyName() {
    this.slug = slugify(this.name, {
      lower: true
    })
  }
}

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  Like,
  OneToMany
} from 'typeorm'
import slugify from 'slugify'
import { User } from './User'
import { Tag } from './Tag'
import { ProjectJoinRequest } from './ProjectJoinRequest'

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
  slug: string

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

  @OneToMany(
    () => ProjectJoinRequest,
    (joinRequest: ProjectJoinRequest) => joinRequest.project
  )
  joinRequests: ProjectJoinRequest[]

  @ManyToMany(() => Tag, tag => tag.projects)
  @JoinTable()
  tags: Tag[]

  @ManyToMany(() => User, user => user.projectsJoined)
  @JoinTable()
  participants: User[]

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: string

  @BeforeInsert()
  async slugifyName() {
    const slug = slugify(this.name, {
      lower: true,
      replacement: '-'
    })

    const existingWithSlug = await Project.count({
      where: {
        slug: Like(`%${slug}%`)
      }
    })

    const postfix =
      existingWithSlug > 0 ? `-${(existingWithSlug + 1).toString()}` : ''

    this.slug = `${slug}${postfix}`
  }
}

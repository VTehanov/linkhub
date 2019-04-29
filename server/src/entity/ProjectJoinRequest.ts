import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import { User } from './User'
import { Project } from './Project'

export enum ProjectJoinRequestStatusEnum {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Declined = 'DECLINED'
}

@Entity()
export class ProjectJoinRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user: User) => user.requestsToJoinProject)
  user: User

  @ManyToOne(() => Project, (project: Project) => project.joinRequests)
  project: Project

  @Column({
    type: 'text',
    nullable: true
  })
  message: string | null

  @Column({
    type: 'enum',
    enum: ProjectJoinRequestStatusEnum,
    default: ProjectJoinRequestStatusEnum.Pending
  })
  status: ProjectJoinRequestStatusEnum
}

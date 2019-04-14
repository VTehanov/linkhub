import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm'

export enum ProjectJoinRequestStatusEnum {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Declined = 'DECLINED'
}

@Entity()
export class ProjectJoinRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @PrimaryColumn()
  userId: string

  @PrimaryColumn()
  projectId: string

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

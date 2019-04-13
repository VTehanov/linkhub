import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm'

export enum ProjectJoinRequestStatusEnum {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  DECLINED = 'Declined'
}

@Entity()
export class ProjectJoinRequest extends BaseEntity {
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
    default: ProjectJoinRequestStatusEnum.PENDING
  })
  status: ProjectJoinRequestStatusEnum
}

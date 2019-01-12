import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}

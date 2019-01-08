import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { EMAIL_MAX_LENGTH } from '../constants/dataConstraints'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: EMAIL_MAX_LENGTH
  })
  email: string
}

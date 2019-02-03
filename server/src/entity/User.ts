import * as bcrypt from 'bcryptjs'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert
} from 'typeorm'
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

  @Column('text')
  password: string

  @Column({
    type: 'boolean',
    default: false
  })
  confirmedEmail: boolean

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}

import * as bcrypt from 'bcryptjs'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  OneToMany
} from 'typeorm'
import { EMAIL_MAX_LENGTH } from '../constants/dataConstraints'
import { Project } from './Project'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {
    length: EMAIL_MAX_LENGTH,
    nullable: true
  })
  email: string | null

  @Column('text', {
    nullable: true
  })
  password: string | null

  @Column('boolean', {
    default: false
  })
  confirmedEmail: boolean

  @Column('boolean', { default: false })
  forgotPasswordLocked: boolean

  @Column('text', {
    nullable: true
  })
  twitterId: string | null

  @OneToMany(() => Project, project => project.creator)
  projects: Project[]

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
}

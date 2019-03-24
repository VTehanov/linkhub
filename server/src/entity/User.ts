import * as bcrypt from 'bcryptjs'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  OneToMany,
  CreateDateColumn
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

  @OneToMany(() => Project, (project: Project) => project.creator)
  projects: Project[]

  @CreateDateColumn()
  createdAt: string

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
}

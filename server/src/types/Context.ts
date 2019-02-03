import { Redis } from 'ioredis'
import { Session } from './session'
import { Request } from 'express'

export interface MyContext {
  session: Session
  redis: Redis
  request: Request
  requestUrl: string
}

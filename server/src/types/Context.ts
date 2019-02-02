import { Redis } from 'ioredis'
import { Session } from './session'

export interface MyContext {
  session: Session
  redis: Redis
  requestUrl: string
}

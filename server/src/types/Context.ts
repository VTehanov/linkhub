import { Redis } from 'ioredis'
import { Session } from './session'
import { Request, Response } from 'express'

export interface MyContext {
  session: Session
  redis: Redis
  request: Request
  response: Response
  requestUrl: string
}

import * as session from 'express-session'
import * as connectRedis from 'connect-redis'

import { redis } from '../services/redis'
import { REDIS_SESSION_PREFIX } from '../constants/names'

const RedisStore = connectRedis(session)

export const sessionMiddleware = session({
  store: new RedisStore({
    client: redis as any,
    prefix: REDIS_SESSION_PREFIX
  }),
  name: 'qid',
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
})
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'

import { redis } from '../services/redis'
import { REDIS_SESSION_PREFIX, SESSION_COOKIE_NAME } from '../constants/names'
import { COOKIE_MAX_AGE_MS } from '../constants/timePeriods'

const RedisStore = connectRedis(session)

export const sessionMiddleware = session({
  store: new RedisStore({
    client: redis as any,
    prefix: REDIS_SESSION_PREFIX
  }),
  name: SESSION_COOKIE_NAME,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE_MS
  }
})

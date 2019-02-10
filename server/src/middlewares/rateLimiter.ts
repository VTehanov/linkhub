import * as RateLimit from 'express-rate-limit'
import * as RateLimitRedisStore from 'rate-limit-redis'
import { redis } from '../services/redis'
import { RATE_LIMITER_WINDOW_MS } from '../constants/timePeriods'

export const rateLimiterMiddleware = new RateLimit({
  store: new RateLimitRedisStore({
    client: redis
  }),
  windowMs: RATE_LIMITER_WINDOW_MS,
  max: 100
})

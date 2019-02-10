import * as RateLimit from 'express-rate-limit'
import * as RateLimitRedisStore from 'rate-limit-redis'
import { redis } from '../services/redis'

export const rateLimiterMiddleware = new RateLimit({
  store: new RateLimitRedisStore({
    client: redis
  }),
  windowMs: 15 * 60 * 1000,
  max: 100
})

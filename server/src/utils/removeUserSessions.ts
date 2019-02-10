import { Redis } from 'ioredis'
import {
  USER_SESSION_ID_PREFIX,
  REDIS_SESSION_PREFIX
} from '../constants/names'

export const removeAllUserSessions = async (userId: string, redis: Redis) => {
  const sessionIDs = await redis.lrange(
    `${USER_SESSION_ID_PREFIX}${userId}`,
    0,
    -1
  )

  const promises: Promise<number>[] = []
  sessionIDs.forEach(async (sessionID: string) =>
    promises.push(redis.del(`${REDIS_SESSION_PREFIX}${sessionID}`))
  )

  await Promise.all(promises)
}

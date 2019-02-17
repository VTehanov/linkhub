import { v4 } from 'uuid'
import { Redis } from 'ioredis'

export const createEmailConfirmationLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4()

  await redis.set(id, userId, 'ex', 60 * 60 * 24)

  return `${url}/api/auth/confirm-email/${id}`
}

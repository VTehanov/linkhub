import { MutationResolvers } from '../../../generated/types'
import {
  USER_SESSION_ID_PREFIX,
  REDIS_SESSION_PREFIX
} from '../../../constants/names'

const Mutation: MutationResolvers.Resolvers = {
  logout: async (_, __, { session, redis }) => {
    const { userId } = session

    if (userId) {
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
      return true
    }

    return false
  }
}

export const resolvers = {
  Mutation
}

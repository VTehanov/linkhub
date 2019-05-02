import { MutationResolvers } from '../../../generated/types'
import { removeAllUserSessions } from '../../../utils/removeUserSessions'
import { SESSION_COOKIE_NAME } from '../../../constants/names'

const Mutation: MutationResolvers.Resolvers = {
  logout: async (_, __, { session, redis, response }) => {
    const { userId } = session

    if (!userId) return false

    await removeAllUserSessions(userId, redis)

    response.clearCookie(SESSION_COOKIE_NAME)
    return true
  }
}

export const resolvers = {
  Mutation
}

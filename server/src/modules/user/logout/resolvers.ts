import { MutationResolvers } from '../../../generated/types'
import { removeAllUserSessions } from '../../../utils/removeUserSessions'

const Mutation: MutationResolvers.Resolvers = {
  logout: async (_, __, { session, redis }) => {
    const { userId } = session

    if (!userId) return false

    await removeAllUserSessions(userId, redis)
    return true
  }
}

export const resolvers = {
  Mutation
}

import { User } from '../../../entity/User'
import { MutationResolvers } from '../../../generated/types'

const Mutation: MutationResolvers.Resolvers = {
  async register(_, { input }) {
    const { email } = input
    let user

    try {
      user = await User.create({ email }).save()
    } catch (err) {
      throw err
    }

    return user
  }
}

export const resolvers = {
  Mutation
}

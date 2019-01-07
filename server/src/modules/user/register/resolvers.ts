import { User } from '../../../entity/User'
import { MutationResolvers } from '../../../generated/types'
import * as errorMessages from './errorMessages'

const Mutation: MutationResolvers.Resolvers = {
  async register(_, { input }) {
    const { email } = input
    let user

    const emailInUse = await User.findOne({ email })
    if (emailInUse) {
      return {
        errors: [
          {
            path: 'email',
            message: errorMessages.DUPLICATE_EMAIL
          }
        ]
      }
    }

    try {
      user = await User.create({ email }).save()
    } catch (err) {
      throw err
    }

    return {
      user
    }
  }
}

export const resolvers = {
  Mutation
}

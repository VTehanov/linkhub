import { User } from '../../../entity/User'
import { MutationResolvers } from '../../../generated/types'
import { DUPLICATE_EMAIL } from './errorMessages'

import { formatYupError } from '../../../utils/formatYupErrors'
import { registerSchema } from './validationSchemas'

const Mutation: MutationResolvers.Resolvers = {
  async register(_, { input }) {
    const { email } = input
    let user

    try {
      await registerSchema.validate(input)
    } catch (err) {
      return {
        errors: formatYupError(err)
      }
    }

    const emailInUse = await User.findOne({ email })
    if (emailInUse) {
      return {
        errors: [
          {
            path: 'email',
            message: DUPLICATE_EMAIL
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

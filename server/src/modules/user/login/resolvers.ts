import { MutationResolvers } from '../../../generated/types'
import { registerSchema } from '../register/validationSchemas'
import { formatYupError } from '../../../utils/formatYupErrors'
import { User } from '../../../entity/User'
import { INVALID_LOGIN } from './errorMessages'

const Mutation: MutationResolvers.Resolvers = {
  async login(_, { input }, { session }) {
    const { email } = input
    let user

    try {
      await registerSchema.validate(input)
    } catch (err) {
      return {
        errors: formatYupError(err)
      }
    }

    user = await User.findOne({ where: { email } })

    if (!user) {
      return {
        errors: [
          {
            path: 'email',
            message: INVALID_LOGIN
          }
        ]
      }
    }

    session.userId = user.id

    return {
      user
    }
  }
}

export const resolvers = {
  Mutation
}

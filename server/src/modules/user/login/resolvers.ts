import { MutationResolvers } from '../../../generated/types'
import { registerSchema } from '../register/validationSchemas'
import { formatYupError } from '../../../utils/formatYupErrors'
import { User } from '../../../entity/User'
import { INVALID_LOGIN } from './errorMessages'
import { USER_SESSION_ID_PREFIX } from '../../../constants/names'

const Mutation: MutationResolvers.Resolvers = {
  async login(_, { input }, { session, redis, request }) {
    const { email } = input

    try {
      await registerSchema.validate(input)
    } catch (err) {
      return {
        errors: formatYupError(err)
      }
    }

    const user = await User.findOne({ where: { email } })

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
    if (request.sessionID) {
      await redis.lpush(
        `${USER_SESSION_ID_PREFIX}${user.id}`,
        request.sessionID
      )
    }

    return {
      user
    }
  }
}

export const resolvers = {
  Mutation
}

import * as bcrypt from 'bcryptjs'

import { MutationResolvers } from '../../../generated/types'
import { registerSchema } from '../register/validationSchemas'
import { formatYupError } from '../../../utils/formatYupErrors'
import { User } from '../../../entity/User'
import { INVALID_LOGIN, FORGOT_PASSWORD_LOCKED_ERROR } from './errorMessages'
import { USER_SESSION_ID_PREFIX } from '../../../constants/names'

const invalidLoginResponse = {
  errors: [
    {
      path: 'email',
      message: INVALID_LOGIN
    }
  ]
}

const Mutation: MutationResolvers.Resolvers = {
  async login(_, { input }, { session, redis, request }) {
    const { email, password } = input

    try {
      await registerSchema.validate(input)
    } catch (err) {
      return {
        errors: formatYupError(err)
      }
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return invalidLoginResponse
    }

    // Add email confirmation check

    if (user.forgotPasswordLocked) {
      return {
        errors: [
          {
            path: 'email',
            message: FORGOT_PASSWORD_LOCKED_ERROR
          }
        ]
      }
    }

    const validPassword: boolean = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return invalidLoginResponse
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

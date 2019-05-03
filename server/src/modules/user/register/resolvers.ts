import { User } from '../../../entity/User'
import { MutationResolvers } from '../../../generated/types'
import { DUPLICATE_EMAIL } from './errorMessages'

import { formatYupError } from '../../../utils/formatYupErrors'
import { registerSchema } from './validationSchemas'
import { createEmailConfirmationLink } from '../../../utils/createEmailConfirmationLink/createEmailConfirmationLink'
import { sendEmail } from '../../../services/sendEmail'
import { USER_SESSION_ID_PREFIX } from '../../../constants/names'

const Mutation: MutationResolvers.Resolvers = {
  async register(_, { input }, { redis, requestUrl, request, session }) {
    const { email, password } = input

    try {
      await registerSchema.validate(input, { abortEarly: false })
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

    const user = await User.create({
      email,
      password
    }).save()

    if (process.env.NODE_ENV !== 'test') {
      await sendEmail(
        email,
        await createEmailConfirmationLink(requestUrl, user.id, redis)
      )
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

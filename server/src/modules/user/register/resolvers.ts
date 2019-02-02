import { User } from '../../../entity/User'
import { MutationResolvers } from '../../../generated/types'
import { DUPLICATE_EMAIL } from './errorMessages'

import { formatYupError } from '../../../utils/formatYupErrors'
import { registerSchema } from './validationSchemas'
import { createEmailConfirmationLink } from '../../../utils/createEmailConfirmationLink/createEmailConfirmationLink'
import { sendEmail } from '../../../services/sendEmail'

const Mutation: MutationResolvers.Resolvers = {
  async register(_, { input }, { redis, requestUrl }) {
    const { email } = input

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

    const user = await User.create({ email }).save()

    if (process.env.NODE_ENV !== 'test') {
      await sendEmail(
        email,
        await createEmailConfirmationLink(requestUrl, user.id, redis)
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

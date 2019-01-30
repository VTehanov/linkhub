import { User } from '../../../entity/User'
import { MutationResolvers } from '../../../generated/types'
import { DUPLICATE_EMAIL } from './errorMessages'

import { formatYupError } from '../../../utils/formatYupErrors'
import { registerSchema } from './validationSchemas'
import { createEmailConfirmationLink } from '../../../utils/createEmailConfirmationLink/createEmailConfirmationLink'

const Mutation: MutationResolvers.Resolvers = {
  async register(_, { input }, { redis, requestUrl }) {
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

    await createEmailConfirmationLink(requestUrl, user.id, redis)

    return {
      user
    }
  }
}

export const resolvers = {
  Mutation
}

import * as yup from 'yup'

import { User } from '../../../entity/User'
import { MutationResolvers } from '../../../generated/types'
import { INVALID_EMAIL, DUPLICATE_EMAIL } from './errorMessages'
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH
} from '../../../constants/dataConstraints'
import { formatYupError } from '../../../utils/formatYupErrors'

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email(INVALID_EMAIL)
    .min(EMAIL_MIN_LENGTH)
    .max(EMAIL_MAX_LENGTH)
})

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

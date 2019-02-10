import * as yup from 'yup'
import * as bcrypt from 'bcryptjs'

import { MutationResolvers } from '../../../generated/types'
import { forgotPasswordLockAccount } from '../../../utils/lockAccount'
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink'
import { User } from '../../../entity/User'
import { EXPIRED_KEY } from './errorMessages'
import { FORGOT_PASSWORD_PREFIX } from '../../../constants/names'
import { passwordSchema } from '../register/validationSchemas'
import { formatYupError } from '../../../utils/formatYupErrors'

const schema = yup.object().shape({
  newPassword: passwordSchema
})

const Mutation: MutationResolvers.Resolvers = {
  async sendForgotPasswordEmail(_, { email }, { redis }) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return false
    }

    await forgotPasswordLockAccount(user.id, redis)
    // TODO: add frontend url
    await createForgotPasswordLink('', user.id, redis)
    // TODO: send email with url
    return true
  },

  async forgotPasswordChange(_, { newPassword, key }, { redis }) {
    const redisKey = `${FORGOT_PASSWORD_PREFIX}${key}`
    const userId = await redis.get(redisKey)
    if (!userId) {
      return [
        {
          path: 'key',
          message: EXPIRED_KEY
        }
      ]
    }

    try {
      await schema.validate(
        {
          newPassword
        },
        { abortEarly: false }
      )
    } catch (err) {
      return formatYupError(err)
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const updateUserPromise = User.update(
      { id: userId },
      {
        forgotPasswordLocked: false,
        password: hashedPassword
      }
    )

    const deleteRedisKeyPromise = redis.del(redisKey)

    await Promise.all([updateUserPromise, deleteRedisKeyPromise])

    return null
  }
}

export const resolvers = {
  Mutation
}

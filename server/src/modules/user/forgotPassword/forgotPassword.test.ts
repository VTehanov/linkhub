import * as faker from 'faker'
import * as Redis from 'ioredis'
import { Connection } from 'typeorm'

import TestRequester from '../../../utils/testUtils/TestRequester'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import { forgotPasswordLockAccount } from '../../../utils/lockAccount'
import { createForgotPasswordLink } from '../../../utils/createForgotPasswordLink'
import { FORGOT_PASSWORD_LOCKED_ERROR } from '../login/errorMessages'
import { PASSWORD_TOO_SHORT } from '../register/errorMessages'
import { EXPIRED_KEY } from './errorMessages'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const seedPassword = faker.internet.password()
const newPassword = faker.internet.password()
const redis = new Redis()

let userId: string
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
  const user = await User.create({
    email: seedEmail,
    password: seedPassword
  }).save()
  userId = user.id
})

afterAll(async () => {
  conn.close()
})

describe('forgot password', () => {
  test('the whole flow works', async () => {
    const rq = new TestRequester()

    // Lock account
    await forgotPasswordLockAccount(userId, redis)

    const url = await createForgotPasswordLink('', userId, redis)
    const parts = url.split('/')
    const key = parts[parts.length - 1]

    // Attempt to login
    const firstLogin = await rq.login({
      email: seedEmail,
      password: seedPassword
    })
    expect(firstLogin).toEqual({
      data: {
        login: {
          errors: [
            {
              path: 'email',
              message: FORGOT_PASSWORD_LOCKED_ERROR
            }
          ],
          user: null
        }
      }
    })

    // Try to change password with an invalid one
    const changePasswordShort = await rq.forgotPasswordChange('a', key)
    expect(changePasswordShort).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: 'newPassword',
            message: PASSWORD_TOO_SHORT
          }
        ]
      }
    })

    // Proper password change
    const changedPassword = await rq.forgotPasswordChange(newPassword, key)
    expect(changedPassword).toEqual({
      data: {
        forgotPasswordChange: null
      }
    })

    // Try to change password with an expired reset key
    const keyExpired = await rq.forgotPasswordChange(
      faker.internet.password(),
      key
    )
    expect(keyExpired).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: 'key',
            message: EXPIRED_KEY
          }
        ]
      }
    })

    // Successfully login with new password
    const loginWithNewPassword = await rq.login({
      email: seedEmail,
      password: newPassword
    })
    expect(loginWithNewPassword).toEqual({
      data: {
        login: {
          errors: null,
          user: {
            email: seedEmail
          }
        }
      }
    })
  })
})

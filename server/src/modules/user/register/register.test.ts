import { Connection } from 'typeorm'
import * as faker from 'faker'

import TestRequester from '../../../utils/testUtils/testRequester'
import * as errorMessages from './errorMessages'
import { User } from '../../../entity/User'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const seedPassword = faker.internet.password()
const rq = new TestRequester()

let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
  await User.create({
    email: seedEmail,
    password: seedPassword
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Register user', () => {
  test('registers user', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const response = await rq.register({ email, password })
    const users = await User.find({ where: { email } })

    expect(response.data).toEqual({
      register: {
        user: { email },
        errors: null
      }
    })

    expect(users).toHaveLength(1)
    expect(users[0].email).toBe(email)
    expect(users[0].password).not.toBe(password)
  })

  test('does not register user if email is already in use', async () => {
    const password = 'somepasswordthatdoesntmatter'
    const response = await rq.register({ email: seedEmail, password })
    const users = await User.find({ where: { email: seedEmail } })

    expect(response.data).toEqual({
      register: {
        errors: [
          {
            path: 'email',
            message: errorMessages.DUPLICATE_EMAIL
          }
        ],
        user: null
      }
    })

    expect(users).toHaveLength(1)
  })

  test('does not register with invalid email', async () => {
    const email = 'smthwrong'
    const password = 'passwordthatdontmatter'
    const response = await rq.register({ email, password })
    const users = await User.find({ where: { email } })

    expect(response.data).toEqual({
      register: {
        errors: [
          {
            path: 'email',
            message: errorMessages.INVALID_EMAIL
          }
        ],
        user: null
      }
    })

    expect(users).toHaveLength(0)
  })
})

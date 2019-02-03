import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { INVALID_LOGIN } from './errorMessages'

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

describe('Login user', () => {
  test('logs in user', async () => {
    const response = await rq.login({
      email: seedEmail,
      password: seedPassword
    })

    expect(response.data).toEqual({
      login: {
        user: { email: seedEmail },
        errors: null
      }
    })
  })

  test('does not login user with invalid credentials', async () => {
    const wrongEmail = 'wrongbutstillemail@mail.com'
    const wrongPassword = 'djf-fe-1-egj1'
    const response = await rq.login({
      email: wrongEmail,
      password: wrongPassword
    })

    expect(response.data).toEqual({
      login: {
        user: null,
        errors: [
          {
            path: 'email',
            message: INVALID_LOGIN
          }
        ]
      }
    })
  })

  test('returns Invalid Login on wrong password', async () => {
    const password = '-0jfh-1sh-1'
    const response = await rq.login({ email: seedEmail, password })
    const users = await User.find({ where: { email: seedEmail } })

    expect(response.data).toEqual({
      login: {
        user: null,
        errors: [
          {
            path: 'email',
            message: INVALID_LOGIN
          }
        ]
      }
    })

    expect(users).toHaveLength(1)
  })
})

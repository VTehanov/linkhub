import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { INVALID_LOGIN } from './errorMessages'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const rq = new TestRequester()

let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
  await User.create({ email: seedEmail }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Login user', () => {
  test('logs in user', async () => {
    const response = await rq.login({ email: seedEmail })

    expect(response.data).toEqual({
      login: {
        user: { email: seedEmail },
        errors: null
      }
    })
  })

  test('does not login user with invalid credentials', async () => {
    const wrongEmail = 'wrongbutstillemail@mail.com'
    const response = await rq.login({ email: wrongEmail })

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
})
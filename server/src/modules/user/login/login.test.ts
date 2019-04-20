import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { INVALID_LOGIN } from './errorMessages'
import { LoginInput } from '../../../generated/types'

faker.seed(process.hrtime()[1])

const userData: LoginInput = {
  email: faker.internet.email(),
  password: faker.internet.password()
}
const rq = new TestRequester()

let user: User
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
  user = await User.create(userData).save()
})

afterAll(async () => {
  conn.close()
})

describe('Login user', () => {
  test('logs in user', async () => {
    const response = await rq.login(userData)

    expect(response.data).toEqual({
      login: {
        user: {
          id: user.id,
          email: userData.email
        },
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
    const response = await rq.login({
      email: userData.email,
      password
    })
    const users = await User.find({ where: { email: userData.email } })

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

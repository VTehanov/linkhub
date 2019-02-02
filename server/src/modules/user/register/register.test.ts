import { Connection } from 'typeorm'
import * as faker from 'faker'

import TestRequester from '../../../utils/testUtils/testRequester'
import * as errorMessages from './errorMessages'
import { User } from '../../../entity/User'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'

const registerMutation = (email: string) => `
  mutation {
    register(input: {
      email: "${email}"
    }) {
      user {
        email
      }
      errors {
        path
        message
      }
    }
  }
`

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
let conn: Connection

beforeAll(async () => {
  conn = await createTestConnection()
  await User.create({ email: seedEmail }).save()
})

afterAll(async () => {
  conn.close()
})

const rq = new TestRequester()

describe('Register user', () => {
  test('registers user', async () => {
    const email = faker.internet.email()
    const response = await rq.simpleQuery(registerMutation(email))
    const users = await User.find({ where: { email } })

    expect(response).toEqual({
      register: {
        user: { email },
        errors: null
      }
    })

    expect(users).toHaveLength(1)
    expect(users[0].email).toBe(email)
  })

  test('does not register user if email is already in use', async () => {
    const response = await rq.simpleQuery(registerMutation(seedEmail))
    const users = await User.find({ where: { email: seedEmail } })

    expect(response).toEqual({
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
    const response = await rq.simpleQuery(registerMutation(email))
    const users = await User.find({ where: { email } })

    expect(response).toEqual({
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

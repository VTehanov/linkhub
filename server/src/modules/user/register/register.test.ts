import { Connection } from 'typeorm'

import { testRequester } from '../../../utils/testUtils/testRequester'
import * as errorMessages from './errorMessages'
import { createTypeormConn } from '../../../utils/createTypeOrmConnection'
import { seedData } from '../../../utils/testUtils/seedData'
import { User } from '../../../entity/User'

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

let conn: Connection
beforeAll(async () => {
  conn = await createTypeormConn()
  await seedData()
})

afterAll(async () => {
  conn.close()
})

describe('Register user', () => {
  test('registers user', async () => {
    const email = 'someRandomEmailThatIsNotInDb@mail.com'
    const response = await testRequester(registerMutation(email))
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
    const email = 'test@mail.com'
    const response = await testRequester(registerMutation(email))
    const users = await User.find({ where: { email } })

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
    const response = await testRequester(registerMutation(email))
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

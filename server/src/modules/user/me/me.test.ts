import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'

const loginMutation = (email: string) => `
  mutation {
    login(input: {
      email: "${email}"
    }) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`

const meQuery = `{
  me {
    email
  }
}`

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
let conn: Connection

beforeAll(async () => {
  conn = await createTestConnection()
  await User.create({
    email: seedEmail,
    confirmedEmail: true
  }).save()
})

afterAll(async () => {
  conn.close()
})

const rq = new TestRequester()

describe('Me query', () => {
  test('gets current user', async () => {
    await rq.withCredentials({
      method: 'post',
      data: {
        query: loginMutation(seedEmail)
      }
    })

    const response = await rq.withCredentials({
      method: 'post',
      data: {
        query: meQuery
      }
    })

    expect(response.data.data).toEqual({
      me: {
        email: seedEmail
      }
    })
  })

  test('should not get user if not logged in', async () => {})
})

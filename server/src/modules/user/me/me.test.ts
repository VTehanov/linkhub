import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const seedPassword = faker.internet.email()
let conn: Connection

beforeAll(async () => {
  conn = await createTestConnection()
  await User.create({
    email: seedEmail,
    password: seedPassword,
    confirmedEmail: true
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Me query', () => {
  test('gets current user', async () => {
    const rq = new TestRequester()
    await rq.login({ email: seedEmail, password: seedPassword })

    const response = await rq.me()

    expect(response.data).toEqual({
      me: {
        email: seedEmail
      }
    })
  })

  test('should not get user if not logged in', async () => {
    const rq2 = new TestRequester()
    const response = await rq2.me()

    expect(response.data).toEqual({
      me: null
    })
  })
})

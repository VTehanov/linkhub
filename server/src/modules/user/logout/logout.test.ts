import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'

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

describe('Logout', () => {
  test('logs user out', async () => {
    await rq.login({ email: seedEmail })

    const response = await rq.me()

    expect(response.data).toEqual({
      me: {
        email: seedEmail
      }
    })

    await rq.logout()

    const response2 = await rq.me()

    expect(response2.data).toEqual({
      me: null
    })
  })
})

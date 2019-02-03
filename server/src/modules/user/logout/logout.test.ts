import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import TestRequester from '../../../utils/testUtils/TestRequester'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const seedPassword = faker.internet.password()
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

describe('Logout', () => {
  test('logs user out', async () => {
    const rq = new TestRequester()

    await rq.login({
      email: seedEmail,
      password: seedPassword
    })

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

  test('logs user out of multiple sessions', async () => {
    const session1 = new TestRequester()
    const session2 = new TestRequester()

    await session1.login({
      email: seedEmail,
      password: seedPassword
    })
    await session2.login({
      email: seedEmail,
      password: seedPassword
    })

    expect(await session1.me()).toEqual(await session2.me())

    await session1.logout()

    const session1me = await session1.me()
    expect(session1me.data.me).toBeNull()
    expect(session1me).toEqual(await session2.me())
  })
})

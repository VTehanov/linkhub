import * as faker from 'faker'
import { Connection } from 'typeorm'
import * as Redis from 'ioredis'
import fetch from 'node-fetch'

import { createEmailConfirmationLink } from './createEmailConfirmationLink'
import { createTestConnection } from '../testUtils/createTestConnection'
import { User } from '../../entity/User'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const redis = new Redis()

let conn: Connection
let userId: string

beforeAll(async () => {
  conn = await createTestConnection()
  const user = await User.create({ email: seedEmail }).save()
  userId = user.id
})

afterAll(async () => {
  conn.close()
})

describe('createEmailConfirmationLink()', () => {
  test('it confirms email and clears key in redis', async () => {
    const link = await createEmailConfirmationLink(
      process.env.TEST_HOST as string,
      userId,
      redis
    )
    const response = await fetch(link)
    const text = await response.text()

    expect(text).toBe('ok')

    const user = await User.findOne({ where: { id: userId } })
    const chunks = link.split('/')
    const key = chunks[chunks.length - 1]
    const value = await redis.get(key)
    expect(value).toBeNull()
    expect((user as User).confirmedEmail).toBeTruthy()
  })

  test('sends invalid back if bad id sent', async () => {
    const response = await fetch(
      `${process.env.TEST_HOST}/confirm/somethingwrong`
    )
    const text = await response.text()

    expect(text).toBe('invalid')
  })
})

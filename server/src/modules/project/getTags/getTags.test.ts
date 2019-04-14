import { Connection } from 'typeorm'
import * as faker from 'faker'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Tag } from '../../../entity/Tag'
import TestRequester from '../../../utils/testUtils/TestRequester'

faker.seed(process.hrtime()[1])
let conn: Connection
const tagsData = [
  {
    id: '1',
    name: faker.commerce.productMaterial()
  },
  {
    id: '2',
    name: faker.commerce.productMaterial()
  }
]

beforeAll(async () => {
  conn = await createTestConnection()

  await Tag.create(tagsData[0]).save(), await Tag.create(tagsData[1]).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get tags', () => {
  test('it returns tags correctly', async () => {
    const rq = new TestRequester()
    const tags = await rq.getTags()

    expect(tags.data.getTags.tags).toEqual(tagsData)
  })
})

import { Connection } from 'typeorm'
import * as faker from 'faker'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Tag } from '../../../entity/Tag'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { toHaveWithKey } from '../../../utils/toHaveWithKey'

faker.seed(process.hrtime()[1])
let conn: Connection
const tagsData: string[] = ['AWS', 'Artificial Intelligence']

beforeAll(async () => {
  conn = await createTestConnection()
  await Tag.create({ name: tagsData[0] }).save()
  await Tag.create({ name: tagsData[1] }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get tags', () => {
  test('it returns tags correctly', async () => {
    const rq = new TestRequester()
    const tags = (await rq.getTags()).data.getTags.tags

    tagsData.forEach(td =>
      expect(toHaveWithKey(tags, { name: td })).toBeTruthy()
    )
  })
})

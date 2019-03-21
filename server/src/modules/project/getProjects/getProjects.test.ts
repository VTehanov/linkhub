import * as faker from 'faker'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Project } from '../../../entity/Project'
import { Connection } from 'typeorm'

faker.seed(process.hrtime()[1])

const seedProjects = [
  {
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  },
  {
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  }
]

let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()

  await Project.create(seedProjects[0]).save()
  await Project.create(seedProjects[1]).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get projects', () => {
  test('it returns posts correctly', async () => {
    const rq = new TestRequester()
    const projects = await rq.getProjects()

    expect(projects.data.getProjects).toEqual({
      projects: seedProjects
    })
  })
})

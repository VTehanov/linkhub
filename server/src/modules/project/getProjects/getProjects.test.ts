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

  const promises = []
  promises.push(Project.create(seedProjects[0]).save())
  promises.push(Project.create(seedProjects[1]).save())

  await Promise.all(promises)
})

afterAll(async () => {
  conn.close()
})

describe('Get projects', () => {
  test('it returns posts correctly', async () => {
    const rq = new TestRequester()
    const projectsResponse = await rq.getProjects()
    const { projects } = projectsResponse.data.getProjects

    expect(projects).toContainEqual(seedProjects[0])
    expect(projects).toContainEqual(seedProjects[1])
    expect(projects.length).toBeGreaterThanOrEqual(seedProjects.length)
  })
})

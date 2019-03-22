import TestRequester from '../../../utils/testUtils/TestRequester'
import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Project } from '../../../entity/Project'

faker.seed(process.hrtime()[1])

let seedProject: Project
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()

  seedProject = await Project.create({
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get project', () => {
  test('it returns project by id', async () => {
    const rq = new TestRequester()
    const project = await rq.getProject(seedProject.id)

    expect(project.data.getProject.project.name).toEqual(seedProject.name)
    expect(project.data.getProject.project.description).toEqual(
      seedProject.description
    )
  })
})

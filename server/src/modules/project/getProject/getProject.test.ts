import TestRequester from '../../../utils/testUtils/TestRequester'
import * as faker from 'faker'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Project } from '../../../entity/Project'
import { Tag } from '../../../entity/Tag'

faker.seed(process.hrtime()[1])

let seedProject: Project
let conn: Connection
let tagName = 'Machine Learning'

beforeAll(async () => {
  conn = await createTestConnection()

  const tags = [await Tag.create({ name: tagName }).save()]
  seedProject = await Project.create({
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100),
    tags
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get project', () => {
  test('it returns project by id', async () => {
    const rq = new TestRequester()
    const projectResult = await rq.getProject(seedProject.id)
    const project = projectResult.data.getProject.project

    expect(project.name).toEqual(seedProject.name)
    expect(project.description).toEqual(seedProject.description)
    expect(project.tags[0].name).toBe(tagName)
  })
})

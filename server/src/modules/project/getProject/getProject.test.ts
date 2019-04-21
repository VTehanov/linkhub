import TestRequester from '../../../utils/testUtils/TestRequester'
import * as faker from 'faker'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Project } from '../../../entity/Project'
import { Tag } from '../../../entity/Tag'
import { CreateProjectInput } from '../../../generated/types'

faker.seed(process.hrtime()[1])

const seedProjectData: CreateProjectInput = {
  name: faker.commerce.productName(),
  description: faker.random.alphaNumeric(100)
}

let seedProject: Project
let conn: Connection
let tagName = 'Machine Learning'

beforeAll(async () => {
  conn = await createTestConnection()

  const tags = [await Tag.create({ name: tagName }).save()]
  seedProject = await Project.create({
    ...seedProjectData,
    tags
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get project', () => {
  test('it returns project by slug', async () => {
    const rq = new TestRequester()
    const projectResult = await rq.getProject(seedProject.slug)
    const project = projectResult.data.getProject.project

    expect(project.name).toEqual(seedProject.name)
    expect(project.slug).toEqual(seedProject.slug)
    expect(project.description).toEqual(seedProject.description)
    expect(project.tags[0].name).toBe(tagName)
  })

  test('returns empty project if invalid slug', async () => {
    const rq = new TestRequester()
    const project = (await rq.getProject('wrong-slug')).data.getProject.project

    expect(project).toBe(null)
  })
})

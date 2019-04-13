import * as faker from 'faker'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Project } from '../../../entity/Project'
import { Connection } from 'typeorm'
import { Tag } from '../../../entity/Tag'

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
const tagsData = [
  {
    name: 'Microservices'
  },
  {
    name: 'Big Data'
  }
]

let tags: Tag[]
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()

  tags = [
    await Tag.create(tagsData[0]).save(),
    await Tag.create(tagsData[1]).save()
  ]

  await Project.create({
    ...seedProjects[0],
    tags
  }).save()

  await Project.create({
    ...seedProjects[1],
    tags: [tags[1]]
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get projects', () => {
  test('it returns posts correctly', async () => {
    const rq = new TestRequester()
    const projectsResponse = await rq.getProjects()
    const { projects } = projectsResponse.data.getProjects

    expect(projects.length).toBeGreaterThanOrEqual(seedProjects.length)
  })
})

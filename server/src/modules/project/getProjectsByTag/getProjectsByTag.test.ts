import TestRequester from '../../../utils/testUtils/TestRequester'
import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Tag } from '../../../entity/Tag'
import { Project } from '../../../entity/Project'

faker.seed(process.hrtime()[1])

const seedProjects = [
  {
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  },
  {
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  },
  {
    name: faker.commerce.productName(),
    description: faker.random.alphaNumeric(100)
  }
]

const tagNames = ['Microservices', 'Big Data', 'Artificial Intelligence']
let tags: Tag[] = []
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()

  tagNames.forEach(async name => tags.push(await Tag.create({ name }).save()))

  await Project.create({
    ...seedProjects[0],
    tags
  }).save()

  await Project.create({
    ...seedProjects[1],
    tags: [tags[1]]
  }).save()

  await Project.create({
    ...seedProjects[2],
    tags: [tags[0], tags[1], tags[2]]
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get projects by tag', async () => {
  test('it returns project with a provided tag', async () => {
    const rq = new TestRequester()
    const tagSlug = 'big-data'
    const projectsResult = await rq.getProjectsByTag(tagSlug)
    const projects = projectsResult.data.getProjectsByTag.projects
    const hasTagSlug = (project: Project, slug: string) => {
      const tagIndex = project.tags.findIndex((t: Tag) => t.name === slug)
      return tagIndex >= 0
    }

    projects.forEach((p: Project) => {
      expect(hasTagSlug(p, tagSlug)).toBeTruthy
    })
  })

  test('it returns an empty array if tag slug does not exist', async () => {
    const rq = new TestRequester()
    const slug = 'somethingwrong'
    const projectsResult = await rq.getProjectsByTag(slug)

    expect(projectsResult.data.getProjectsByTag.projects).toEqual([])
  })
})

import TestRequester from '../../../utils/testUtils/TestRequester'
import faker = require('faker')
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { Tag } from '../../../entity/Tag'
import { Project } from '../../../entity/Project'
import slugify from 'slugify'

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

const tagsData = [
  {
    id: '1',
    name: 'Microservices'
  },
  {
    id: '2',
    name: 'Big Data'
  },
  {
    id: '3',
    name: 'Artificial Intelligence'
  }
]

let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()

  const tags = [
    await Tag.create(tagsData[0]).save(),
    await Tag.create(tagsData[1]).save(),
    await Tag.create(tagsData[2]).save()
  ]

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
    tags: [tags[1], tags[2]]
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Get projects by tag', async () => {
  test('it returns project with a provided tag', async () => {
    const rq = new TestRequester()
    const slug = slugify(tagsData[2].name, { lower: true })
    const projectsResult = await rq.getProjectsByTag(slug)

    expect(projectsResult.data.getProjectsByTag.projects).toContainEqual({
      ...seedProjects[0],
      tags: [
        {
          ...tagsData[0],
          slug: 'microservices'
        },
        {
          ...tagsData[1],
          slug: 'big-data'
        },
        {
          ...tagsData[2],
          slug
        }
      ]
    })
  })

  test('it returns an empty array if slug does not exist', async () => {
    const rq = new TestRequester()
    const slug = 'somethingwrong'
    const projectsResult = await rq.getProjectsByTag(slug)

    expect(projectsResult.data.getProjectsByTag.projects).toEqual([])
  })
})

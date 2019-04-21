import { Connection } from 'typeorm'
import * as faker from 'faker'

import TestRequester from '../../../utils/testUtils/TestRequester'
import * as errorMessages from './errorMessages'
import { Project, ProgressStatusEnum } from '../../../entity/Project'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import { Tag } from '../../../entity/Tag'
import { RegisterInput, CreateProjectInput } from '../../../generated/types'

faker.seed(process.hrtime()[1])

const userData: RegisterInput = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

const projectData: CreateProjectInput = {
  name: 'Slug Me IF yOu cAn',
  description: faker.random.alphaNumeric(80)
}

let tagNames = ['Android', 'Machine Learning']
let tags: Tag[] = []
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()

  await User.create(userData).save()

  tagNames.forEach(async t => tags.push(await Tag.create({ name: t }).save()))
})

afterAll(async () => {
  conn.close()
})

describe('Create project', () => {
  test('creates project by the logged in user', async () => {
    const rq = new TestRequester()

    await rq.login(userData)

    const response = await rq.createProject(projectData)
    const resProject: Project = response.data.createProject.project

    expect(resProject.name).toBe(projectData.name)
    expect(resProject.description).toBe(projectData.description)

    const projects = await Project.find({ where: { name: projectData.name } })
    expect(projects).toHaveLength(1)
    expect(projects[0].name).toBe(projectData.name)
    expect(projects[0].slug).toBe('slug-me-if-you-can')
    expect(projects[0].description).toBe(projectData.description)
    expect(projects[0].progressStatus).toBe(ProgressStatusEnum.NOT_STARTED)

    const user = await User.findOne({
      where: {
        email: userData.email
      },
      relations: ['projects']
    })

    expect(user!.projects).toHaveLength(1)
    expect(user!.projects[0]).toEqual(projects[0])
  })

  test('it does not create project with invalid data', async () => {
    const rq = new TestRequester()
    await rq.login(userData)

    const name = 'Te'
    const description = 'st'
    const response = await rq.createProject({ name, description })
    const projects = await Project.find({ where: { name, description } })

    expect(projects).toHaveLength(0)
    expect(response.data).toEqual({
      createProject: {
        errors: [
          {
            path: 'name',
            message: errorMessages.NAME_TOO_SHORT
          },
          {
            path: 'description',
            message: errorMessages.DESCRIPTION_TOO_SHORT
          }
        ],
        project: null
      }
    })
  })

  it('does not create a project if user is not logged in', async () => {
    const rq = new TestRequester()
    const name = faker.commerce.productName()
    const description = faker.random.alphaNumeric(80)
    const response = await rq.createProject({ name, description })

    expect(response.data).toEqual({
      createProject: {
        errors: [
          {
            path: 'email',
            message: 'Please log in'
          }
        ],
        project: null
      }
    })
  })

  it('creates a project with provided tags', async () => {
    const rq = new TestRequester()
    const projectData: CreateProjectInput = {
      name: faker.commerce.productName(),
      description: faker.random.alphaNumeric(80)
    }

    await rq.login(userData)
    const response = await rq.createProject({
      ...projectData,
      tags: [tags[0].id, tags[1].id]
    })

    const project: Project = response.data.createProject.project
    expect(project.name).toEqual(projectData.name)
    expect(project.description).toEqual(projectData.description)
    expect(project.tags).toHaveLength(tagNames.length)
    expect(project.tags[0].name).toEqual(tagNames[0])
    expect(project.tags[1].name).toEqual(tagNames[1])
  })

  test('modifies slug if it already exists', async () => {
    const rq = new TestRequester()
    const data: CreateProjectInput = {
      name: 'coUNt ThE SlugSsS',
      description: faker.random.alphaNumeric(80)
    }
    const expectedSlug = 'count-the-slugsss'

    await rq.login(userData)
    const project: Project = (await rq.createProject(data)).data.createProject
      .project
    const secondProject: Project = (await rq.createProject(data)).data
      .createProject.project
    const thirdProject: Project = (await rq.createProject(data)).data
      .createProject.project

    expect(project.slug).toBe(expectedSlug)
    expect(secondProject.slug).toBe(`${expectedSlug}-2`)
    expect(thirdProject.slug).toBe(`${expectedSlug}-3`)
  })
})

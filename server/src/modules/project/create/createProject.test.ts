import { Connection } from 'typeorm'
import * as faker from 'faker'

import TestRequester from '../../../utils/testUtils/TestRequester'
import * as errorMessages from './errorMessages'
import { Project, ProgressStatusEnum } from '../../../entity/Project'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'

faker.seed(process.hrtime()[1])
const seedEmail = faker.internet.email()
const seedPassword = faker.internet.password()

let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
  await User.create({
    email: seedEmail,
    password: seedPassword
  }).save()
})

afterAll(async () => {
  conn.close()
})

describe('Create project', () => {
  test('creates project by the logged in user', async () => {
    const rq = new TestRequester()
    const name = faker.commerce.productName()
    const description = faker.random.alphaNumeric(80)

    await rq.login({
      email: seedEmail,
      password: seedPassword
    })

    const response = await rq.createProject({ name, description })
    expect(response.data).toEqual({
      createProject: {
        project: {
          name,
          description,
          progressStatus: ProgressStatusEnum.NOT_STARTED
        },
        errors: []
      }
    })

    const projects = await Project.find({ where: { name } })
    expect(projects).toHaveLength(1)
    expect(projects[0].name).toEqual(name)
    expect(projects[0].description).toEqual(description)

    const user = await User.findOne({
      where: {
        email: seedEmail
      },
      relations: ['projects']
    })

    expect(user!.projects).toHaveLength(1)
    expect(user!.projects[0]).toEqual(projects[0])
  })

  test('it does not create project with invalid data', async () => {
    const rq = new TestRequester()
    await rq.login({
      email: seedEmail,
      password: seedPassword
    })

    const prevCount = await Project.count()
    const name = 'Te'
    const description = 'st'
    const response = await rq.createProject({ name, description })
    const projects = await Project.find({ where: { name, description } })
    const afterCount = await Project.count()

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
    expect(afterCount).toBe(prevCount)
    expect(projects).toHaveLength(0)
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
})

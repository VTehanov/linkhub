import * as faker from 'faker'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { Project } from '../../../entity/Project'
import { Connection } from 'typeorm'
import { v4 } from 'uuid'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import {
  ProjectJoinRequest,
  ProjectJoinRequestStatusEnum
} from '../../../entity/ProjectJoinRequest'
import {
  PLEASE_LOG_IN,
  PROJECT_DOES_NOT_EXIST,
  USER_ALREADY_REQUESTED
} from './errorMessages'
import { CreateProjectInput, RegisterInput } from '../../../generated/types'

faker.seed(process.hrtime()[1])

const projectData: CreateProjectInput = {
  name: faker.commerce.productName(),
  description: faker.random.alphaNumeric(80)
}

const userData: RegisterInput = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

let project: Project
let user: User
let conn: Connection

beforeAll(async () => {
  conn = await createTestConnection()
  project = await Project.create({
    name: projectData.name,
    description: projectData.description
  }).save()

  user = await User.create(userData).save()
})

afterAll(async () => {
  conn.close()
})

describe('Create Request to Join Project', () => {
  test('creates a request by logged in user to a project', async () => {
    const rq = new TestRequester()
    await rq.login(userData)
    const message = 'I would like to join the project'
    const res = await rq.requestToJoinProject(project.id, message)
    const projectJoinRequests: ProjectJoinRequest[] = await ProjectJoinRequest.find(
      {
        where: {
          projectId: project.id,
          userId: user.id
        }
      }
    )

    expect(res.data.requestToJoinProject.errors).toEqual([])
    expect(projectJoinRequests).toHaveLength(1)
    expect(projectJoinRequests[0].userId).toBe(user.id)
    expect(projectJoinRequests[0].projectId).toBe(project.id)
    expect(projectJoinRequests[0].message).toBe(message)
    expect(projectJoinRequests[0].status).toBe(
      ProjectJoinRequestStatusEnum.Pending
    )
  })

  test('does not join a project if not logged in', async () => {
    const rq = new TestRequester()
    const previousCount = await ProjectJoinRequest.count({
      where: {
        projectId: project.id
      }
    })
    const res = await rq.requestToJoinProject(project.id)
    const afterCount = await ProjectJoinRequest.count({
      where: {
        projectId: project.id
      }
    })

    expect(res.data.requestToJoinProject.errors).toEqual([
      {
        message: PLEASE_LOG_IN
      }
    ])

    expect(previousCount).toBe(afterCount)
  })

  test('does not join a project with a wrong projectId', async () => {
    const rq = new TestRequester()
    const previousCount = await ProjectJoinRequest.count({
      where: {
        projectId: project.id
      }
    })

    await rq.login(userData)
    const res = await rq.requestToJoinProject(v4())
    const afterCount = await ProjectJoinRequest.count({
      where: {
        projectId: project.id
      }
    })

    expect(res.data.requestToJoinProject.errors).toEqual([
      {
        message: PROJECT_DOES_NOT_EXIST
      }
    ])
    expect(previousCount).toBe(afterCount)
  })

  test('cannot request to join a project twice', async () => {
    const rq = new TestRequester()

    await rq.login(userData)
    const anotherProject = await Project.create({
      name: projectData.name,
      description: projectData.description
    }).save()
    const firstResponse = await rq.requestToJoinProject(anotherProject.id)
    const requests = await ProjectJoinRequest.find({
      where: {
        projectId: anotherProject.id,
        userId: user.id
      }
    })

    expect(requests).toHaveLength(1)
    expect(firstResponse.data.requestToJoinProject).toEqual({
      errors: []
    })

    const secondResponse = await rq.requestToJoinProject(anotherProject.id)
    const secondRequests = await ProjectJoinRequest.find({
      where: {
        projectId: anotherProject.id,
        userId: user.id
      }
    })

    expect(secondResponse.data.requestToJoinProject).toEqual({
      errors: [
        {
          message: USER_ALREADY_REQUESTED
        }
      ]
    })
    expect(secondRequests).toHaveLength(1)

    // console.log(projectAfterRequest)
    // expect(projectAfterRequest!.participants).toHaveLength(1)
    // expect(projectAfterRequest!.participants[0].id).toBe(user.id)

    // const resSecondRequest = await rq.requestToJoinProject(project.id)
    // expect(resSecondRequest.data.requestToJoingProject.errors).toEqual({
    //   path: 'project',
    //   message: USER_ALREADY_REQUESTED
    // })

    // await projectAfterRequest!.reload()
    // expect(projectAfterRequest!.participants).toHaveLength(1)
    // expect(projectAfterRequest!.participants[0].id).toBe(user.id)
  })
})

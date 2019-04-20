import * as faker from 'faker'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { RegisterInput, CreateProjectInput } from '../../../generated/types'
import { User } from '../../../entity/User'
import { Project } from '../../../entity/Project'
import {
  ProjectJoinRequest,
  ProjectJoinRequestStatusEnum
} from '../../../entity/ProjectJoinRequest'

faker.seed(process.hrtime()[1])

const ownerData: RegisterInput = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

const participantData: RegisterInput = {
  email: faker.internet.email(),
  password: faker.internet.password()
}
const secondParticipantData: RegisterInput = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

const projectData: CreateProjectInput = {
  name: faker.commerce.productName(),
  description: faker.random.alphaNumeric(100)
}

let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()
  const promises: Promise<any>[] = []
  promises.push(User.create(ownerData).save())
  promises.push(User.create(participantData).save())
  promises.push(User.create(secondParticipantData).save())
  await Promise.all(promises)
})

afterAll(async () => {
  conn.close()
})

describe('getProjectPendingRequests()', () => {
  test('it returns all pending request for a project', async () => {
    const owner = new TestRequester()
    const participant = new TestRequester()

    await owner.login(ownerData)
    await participant.login(participantData)

    const participantResponse = await participant.login(participantData)
    const participantId = participantResponse.data.login.user.id
    const createProjectRes = await owner.createProject(projectData)
    const project: Project = createProjectRes.data.createProject.project

    await participant.requestToJoinProject(project.id)
    const pendingRequestsRes = await owner.getProjectPendingRequests(project.id)
    const requests: ProjectJoinRequest[] =
      pendingRequestsRes.data.getProjectPendingRequests.requests

    expect(requests).toHaveLength(1)
    expect(requests[0].projectId).toEqual(project.id)
    expect(requests[0].userId).toEqual(participantId)
  })

  test('it does not return approved requests', async () => {
    const owner = new TestRequester()
    const participant = new TestRequester()
    const secondParticipant = new TestRequester()

    await owner.login(ownerData)
    const participantId = (await participant.login(participantData)).data.login
      .user.id
    await secondParticipant.login(secondParticipantData)

    const project: Project = (await owner.createProject(projectData)).data
      .createProject.project

    await participant.requestToJoinProject(project.id)
    const firstRequest = await ProjectJoinRequest.findOne({
      where: {
        userId: participantId,
        projectId: project.id
      }
    })

    await secondParticipant.requestToJoinProject(project.id)
    await owner.respondToJoinRequest(firstRequest!.id)

    const requests: ProjectJoinRequest[] = (await owner.getProjectPendingRequests(
      project.id
    )).data.getProjectPendingRequests.requests

    expect(requests).toHaveLength(1)
    expect(requests[0].status).toBe(ProjectJoinRequestStatusEnum.Pending)
  })

  test('it returns nothing if user is not owner', async () => {
    const owner = new TestRequester()
    const participant = new TestRequester()

    await owner.login(ownerData)
    await participant.login(participantData)

    const projectRes = await owner.createProject(projectData)
    const project: Project = projectRes.data.createProject.project
    const requests: Request[] = (await participant.getProjectPendingRequests(
      project.id
    )).data.getProjectPendingRequests.requests

    expect(requests).toEqual([])
  })
})

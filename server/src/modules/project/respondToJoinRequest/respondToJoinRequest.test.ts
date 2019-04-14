import * as faker from 'faker'
import TestRequester from '../../../utils/testUtils/TestRequester'
import { Connection } from 'typeorm'
import { createTestConnection } from '../../../utils/testUtils/createTestConnection'
import { User } from '../../../entity/User'
import { CreateProjectInput, RegisterInput } from '../../../generated/types'
import { Project } from '../../../entity/Project'
import {
  ProjectJoinRequest,
  ProjectJoinRequestStatusEnum
} from '../../../entity/ProjectJoinRequest'

faker.seed(process.hrtime()[1])

const ownerData: RegisterInput = {
  email: faker.internet.email(),
  password: faker.internet.password(12)
}

const participantData: RegisterInput = {
  email: faker.internet.email(),
  password: faker.internet.password(12)
}

const projectData: CreateProjectInput = {
  name: faker.commerce.productName(),
  description: faker.random.alphaNumeric(80)
}

let participant: User
let conn: Connection
beforeAll(async () => {
  conn = await createTestConnection()

  await User.create(ownerData).save()
  participant = await User.create(participantData).save()
})

afterAll(async () => {
  conn.close()
})

describe('Respond to project join request', () => {
  test('Proper flow for project requests', async () => {
    const ownerSession = new TestRequester()
    const participantSession = new TestRequester()
    const message = faker.lorem.words(6)

    await ownerSession.login(ownerData)
    await participantSession.login(participantData)

    // Create a project
    const createProjectRes = await ownerSession.createProject(projectData)
    const project: Project = createProjectRes.data.createProject.project

    // Participant requests to join
    await participantSession.requestToJoinProject(project.id, message)

    // Assert request is created properly
    const joinRequest = await ProjectJoinRequest.find({
      where: {
        projectId: project.id,
        userId: participant.id
      }
    })
    expect(joinRequest).toHaveLength(1)
    expect(joinRequest[0].userId).toBe(participant.id)
    expect(joinRequest[0].projectId).toBe(project.id)
    expect(joinRequest[0].message).toBe(message)

    // Owner approves request
    await ownerSession.respondToJoinRequest(
      joinRequest[0].id,
      ProjectJoinRequestStatusEnum.Approved
    )

    // Assertions
    const projectUpdated = await Project.createQueryBuilder('project')
      .where('project.id = :id', { id: project.id })
      .leftJoinAndSelect('project.participants', 'user')
      .getOne()

    const participantUpdated = await User.createQueryBuilder('user')
      .where('user.id = :id', { id: participant.id })
      .leftJoinAndSelect('user.projectsJoined', 'project')
      .getOne()

    expect(projectUpdated!.participants).toHaveLength(1)
    expect(projectUpdated!.participants[0].id).toBe(participant.id)

    expect(participantUpdated!.projectsJoined).toHaveLength(1)
    expect(participantUpdated!.projectsJoined[0].id).toBe(project.id)

    const joinRequestUpdated = await ProjectJoinRequest.find({
      where: {
        projectId: project.id,
        userId: participant.id
      }
    })

    expect(joinRequestUpdated[0].status).toBe(
      ProjectJoinRequestStatusEnum.Approved
    )
  })

  test('Throws errors on wrong input', async () => {
    // TODO:
  })
})

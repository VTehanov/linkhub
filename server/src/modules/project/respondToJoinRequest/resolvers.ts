import { MutationResolvers } from '../../../generated/types'
import {
  ProjectJoinRequest,
  ProjectJoinRequestStatusEnum
} from '../../../entity/ProjectJoinRequest'
import {
  JOIN_REQUEST_NOT_FOUND,
  PROJECT_DOES_NOT_EXIST,
  USER_DOES_NOT_EXIST
} from './errorMessages'
import { Project } from '../../../entity/Project'
import { User } from '../../../entity/User'

const Mutation: MutationResolvers.Resolvers = {
  async respondToJoinRequest(_, { input }) {
    const { requestId } = input
    const existingRequest = await ProjectJoinRequest.findOne({
      where: {
        id: requestId
      },
      relations: ['project', 'user']
    })

    if (!existingRequest) {
      return {
        errors: [{ path: 'requestId', message: JOIN_REQUEST_NOT_FOUND }]
      }
    }

    const project = await Project.createQueryBuilder('project')
      .where('project.id = :id', { id: existingRequest.project.id })
      .leftJoinAndSelect('project.participants', 'user')
      .getOne()

    // No project for this request
    if (!project) {
      return {
        errors: [{ path: 'project', message: PROJECT_DOES_NOT_EXIST }]
      }
    }

    const user = await User.createQueryBuilder('user')
      .where('user.id = :id', { id: existingRequest.user.id })
      .leftJoinAndSelect('user.projectsJoined', 'project')
      .getOne()

    // no user found for this request
    if (!user) {
      return {
        errors: [{ path: 'user', message: USER_DOES_NOT_EXIST }]
      }
    }

    // TODO:
    // check if user is already in a project
    // check if creator is requesting to join his own project

    project.participants.push(user)
    user.projectsJoined.push(project)
    existingRequest.status = ProjectJoinRequestStatusEnum.Approved

    const resultPromises: Promise<any>[] = []
    resultPromises.push(user.save())
    resultPromises.push(project.save())
    resultPromises.push(existingRequest.save())

    await Promise.all(resultPromises)

    return {
      errors: []
    }
  }
}

export const resolvers = { Mutation }

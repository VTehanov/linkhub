import { MutationResolvers } from '../../../generated/types'
import { Project } from '../../../entity/Project'
import { ProjectJoinRequest } from '../../../entity/ProjectJoinRequest'
import {
  PLEASE_LOG_IN,
  PROJECT_DOES_NOT_EXIST,
  USER_ALREADY_REQUESTED
} from './errorMessages'
import { User } from '../../../entity/User'

const Mutation: MutationResolvers.Resolvers = {
  async requestToJoinProject(_, { input }, { session }) {
    const { projectId, message } = input
    const { userId } = session
    const project = await Project.findOne({
      where: {
        id: projectId
      },
      relations: ['participants']
    })

    if (!userId) {
      return {
        errors: [
          {
            path: 'account',
            message: PLEASE_LOG_IN
          }
        ]
      }
    }

    const user = await User.findOne({
      where: {
        id: userId
      }
    })

    if (!user) {
      return {
        errors: [
          {
            path: 'account',
            message: PLEASE_LOG_IN
          }
        ]
      }
    }

    if (!project) {
      return {
        errors: [
          {
            path: 'project',
            message: PROJECT_DOES_NOT_EXIST
          }
        ]
      }
    }

    const existingRequest = await ProjectJoinRequest.findOne({
      where: {
        project,
        user
      }
    })

    console.log(project.id)
    console.log(user.id)
    console.log(existingRequest)

    if (existingRequest) {
      return {
        errors: [
          {
            path: 'project',
            message: USER_ALREADY_REQUESTED
          }
        ]
      }
    }

    await ProjectJoinRequest.create({
      user,
      project,
      message
    }).save()

    return {
      errors: []
    }
  }
}

export const resolvers = {
  Mutation
}

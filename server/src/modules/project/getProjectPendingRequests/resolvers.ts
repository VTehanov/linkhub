import {
  QueryResolvers,
  ProjectJoinRequestStatusEnum
} from '../../../generated/types'
import { ProjectJoinRequest } from '../../../entity/ProjectJoinRequest'
import { Project } from '../../../entity/Project'

const Query: QueryResolvers.Resolvers = {
  async getProjectPendingRequests(_, { input }, { session }) {
    const { projectId } = input
    const { userId } = session
    const promises: Promise<any>[] = []

    promises.push(
      Project.findByIds([projectId], {
        relations: ['creator']
      })
    )

    promises.push(
      ProjectJoinRequest.createQueryBuilder('request')
        .where('request.projectId = :projectId', { projectId })
        .andWhere('request.status = :status', {
          status: ProjectJoinRequestStatusEnum.Pending
        })
        .getMany()
    )

    const [project, requests] = await Promise.all(promises)

    if (project[0].creator.id !== userId) {
      const filteredRequests = requests.filter(
        (request: ProjectJoinRequest) => request.userId === userId
      )

      return {
        requests: filteredRequests
      }
    }

    return { requests }
  }
}

export const resolvers = { Query }

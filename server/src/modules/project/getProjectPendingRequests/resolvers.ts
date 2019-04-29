import { QueryResolvers } from '../../../generated/types'
import {
  ProjectJoinRequest,
  ProjectJoinRequestStatusEnum
} from '../../../entity/ProjectJoinRequest'
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
        .leftJoinAndSelect('request.user', 'user')
        .leftJoinAndSelect('request.project', 'project')
        .where('request.project = :projectId', { projectId })
        .andWhere('request.status = :status', {
          status: ProjectJoinRequestStatusEnum.Pending
        })
        .getMany()
    )

    const [project, requests] = await Promise.all(promises)

    if (project[0].creator.id !== userId) {
      const filteredRequests = requests.filter(
        (request: ProjectJoinRequest) => request.user.id === userId
      )

      return {
        requests: filteredRequests
      }
    }

    return { requests }
  }
}

export const resolvers = { Query }

import { QueryResolvers } from '../../../generated/types'
import { Project } from '../../../entity/Project'

const Query: QueryResolvers.Resolvers = {
  async myProjects(_, __, { session }) {
    const userId = session.userId

    if (!userId) {
      return {
        projects: []
      }
    }

    const projects = await Project.find({
      where: {
        creator: userId
      }
    })

    return { projects }
  }
}

export const resolvers = { Query }

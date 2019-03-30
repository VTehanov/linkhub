import { QueryResolvers } from '../../../generated/types'
import { Project } from '../../../entity/Project'

const Query: QueryResolvers.Resolvers = {
  async getProjects() {
    const projects = await Project.createQueryBuilder('project')
      .leftJoinAndSelect('project.tags', 'tag')
      .getMany()

    return {
      projects
    }
  }
}

export const resolvers = { Query }

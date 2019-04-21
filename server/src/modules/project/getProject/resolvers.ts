import { QueryResolvers } from '../../../generated/types'
import { Project } from '../../../entity/Project'

const Query: QueryResolvers.Resolvers = {
  async getProject(_, { input }) {
    const { slug } = input

    const project = await Project.createQueryBuilder('project')
      .where('project.slug = :slug', { slug })
      .leftJoinAndSelect('project.tags', 'tag')
      .leftJoinAndSelect('project.creator', 'creator')
      .leftJoinAndSelect('project.participants', 'user')
      .getOne()

    return {
      project
    }
  }
}

export const resolvers = { Query }

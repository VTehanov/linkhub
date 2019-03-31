import { QueryResolvers } from '../../../generated/types'
import { Tag } from '../../../entity/Tag'

const Query: QueryResolvers.Resolvers = {
  async getProjectsByTag(_, { input }) {
    const tag = await Tag.createQueryBuilder('theTag')
      .where('theTag.slug = :slug', { slug: input.slug })
      .innerJoinAndSelect('theTag.projects', 'projects')
      .leftJoinAndSelect('projects.tags', 'tag')
      .getOne()

    return {
      projects: (tag && tag.projects) || []
    }
  }
}

export const resolvers = { Query }

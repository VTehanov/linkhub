import { QueryResolvers } from '../../../generated/types'
import { Project } from '../../../entity/Project'

const Query: QueryResolvers.Resolvers = {
  async getProject(_, { input }) {
    const project = await Project.findOne({
      id: input.id
    })

    // TODO: Add slugs + search by slug
    // var data = await getRepository(User)
    // .createQueryBuilder("user")
    // .where("user.firstName like :name", {name: '%' + firstName + '%' })
    // .getMany();

    return {
      project
    }
  }
}

export const resolvers = { Query }

import { MutationResolvers } from '../../generated/types'


const Mutation: MutationResolvers.Resolvers = {
  createProject: async (
    _,
    { data },
    { db }
  ) => {
    const project = await db.mutation.createProject({
      data: {
        name: data.name,
        description: data.description
      }
    })

    return project
  }
}


export const resolvers = {
  Mutation
}
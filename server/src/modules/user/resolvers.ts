import { MutationResolvers } from '../../generated/types'


const Mutation: MutationResolvers.Resolvers = {
  createUser: async (
    _,
    { data },
    { db }
  ) => {
    const user = await db.mutation.createUser({
      data: {
        email: data.email
      }
    })

    return user
  }
}


export const resolvers = {
  Mutation
}
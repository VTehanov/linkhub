import { MutationResolvers } from '../../../generated/types'

const Mutation: MutationResolvers.Resolvers = {
  logout: (_, __, { session }) =>
    new Promise(resolve => {
      session.destroy(err => {
        if (err) {
          console.log('logout error', err)
        }

        resolve(true)
      })
    })
}

export const resolvers = {
  Mutation
}

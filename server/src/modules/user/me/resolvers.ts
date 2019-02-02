import { QueryResolvers } from '../../../generated/types'
import { createMiddleware } from '../../../utils/createMiddleware'
import middleware from './middleware'
import { User } from '../../../entity/User'

const Query: QueryResolvers.Resolvers = {
  me: createMiddleware(middleware, (_, __, { session }) =>
    User.findOne({ where: { id: session.userId } })
  )
}

export const resolvers = {
  Query
}

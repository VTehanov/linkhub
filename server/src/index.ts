import { GraphQLServer } from 'graphql-yoga'

import db from './database';
import { getTypeDefs, getResolvers } from './createSchema';


const server = new GraphQLServer({
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
  resolverValidationOptions: {
    // TODO: fix the need for this
    requireResolversForResolveType: false
  },
  context: (req: any) => ({
    ...req,
    db
  })
})

server.start(() => console.log('Server is running on http://localhost:4000'))
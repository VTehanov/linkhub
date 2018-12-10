import { GraphQLServer } from 'graphql-yoga'


import db from './database';
import { getTypeDefs, getResolvers } from './createSchema';
import { Request } from 'express';


const server = new GraphQLServer({
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: (req: Request) => ({
    ...req,
    db
  })
})

server.start(() => console.log('* Server is running on http://localhost:4000'))
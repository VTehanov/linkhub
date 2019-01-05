import 'reflect-metadata'

import { GraphQLServer } from 'graphql-yoga'
import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createTypeormConn } from './utils/createTypeOrmConnection'
// import { createTestConn } from './utils/testUtils/createTestConnection'

export const startServer = async () => {
  const server = new GraphQLServer({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers()
  })

  await createTypeormConn()

  const app = await server.start().then(() => {
    console.log('* Server is up on localhost:4000')
  })

  return app
}

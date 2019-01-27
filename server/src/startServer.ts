import 'reflect-metadata'

import { GraphQLServer, Options } from 'graphql-yoga'
import { AddressInfo } from 'net'

import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createTypeormConn } from './utils/createTypeOrmConnection'
import { createTestConnection } from './utils/testUtils/createTestConnection'

export const startServer = async (serverOptions: Options = {}) => {
  const server = new GraphQLServer({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers()
  })

  if (process.env.NODE_ENV === 'test') {
    await createTestConnection(true)
  } else {
    await createTypeormConn()
  }

  const app = await server.start({
    cors: {
      credentials: true,
      origin: 'http://localhost:3000'
    },
    ...serverOptions
  })
  const { port } = app.address() as AddressInfo
  console.log(`\n* Server is up on :${port}`)

  return app
}

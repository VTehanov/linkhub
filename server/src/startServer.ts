import 'reflect-metadata'

import { GraphQLServer, Options } from 'graphql-yoga'
import { AddressInfo } from 'net'

import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createTypeormConn } from './utils/createTypeOrmConnection'
import { createTestConnection } from './utils/testUtils/createTestConnection'
import { redis } from './redis'
import { confirmEmail } from './routes/confirmEmail'

export const startServer = async (serverOptions: Options = {}) => {
  const server = new GraphQLServer({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers(),
    context: ({ request }) => ({
      redis,
      requestUrl: `${request.protocol}://${request.get('host')}`
    })
  })

  if (process.env.NODE_ENV === 'test') {
    await createTestConnection(true)
  } else {
    await createTypeormConn()
  }

  server.express.get('/confirm/:id', confirmEmail)

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

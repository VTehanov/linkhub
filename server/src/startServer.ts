import 'reflect-metadata'
import 'dotenv/config'

import { GraphQLServer, Options } from 'graphql-yoga'
import { AddressInfo } from 'net'

import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createTypeormConn } from './utils/createTypeOrmConnection'
import { createTestConnection } from './utils/testUtils/createTestConnection'
import { redis } from './services/redis'
import { confirmEmail } from './routes/confirmEmail'
import { sessionMiddleware } from './middlewares/session'
import { rateLimiterMiddleware } from './middlewares/rateLimiter'

const nodeEnv: string = process.env.NODE_ENV as string

export const startServer = async (serverOptions: Options = {}) => {
  if (nodeEnv === 'test') {
    await redis.flushall()
  }

  const server = new GraphQLServer({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers(),
    context: ({ request }) => ({
      redis,
      request,
      requestUrl: `${request.protocol}://${request.get('host')}`,
      session: request.session
    })
  })

  if (nodeEnv === 'test') {
    await createTestConnection(true)
  } else {
    await createTypeormConn()
  }

  server.express.use(rateLimiterMiddleware)
  server.express.use(sessionMiddleware)

  server.express.get('/confirm/:id', confirmEmail)

  const cors = {
    credentials: true,
    origin: nodeEnv === 'test' ? '*' : process.env.FRONTEND_HOST
  }

  const app = await server.start({
    cors,
    ...serverOptions
  })
  const { port } = app.address() as AddressInfo
  console.log(`\n* Server is up on :${port}`)

  return app
}

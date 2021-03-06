import 'reflect-metadata'
import 'dotenv/config'

import { GraphQLServer, Options } from 'graphql-yoga'
import { AddressInfo } from 'net'

import { getTypeDefs, getResolvers } from './utils/createSchema'
import { redis } from './services/redis'
import { sessionMiddleware } from './middlewares/session'
import { rateLimiterMiddleware } from './middlewares/rateLimiter'
import { passport } from './services/passport'
import { apiRoutes } from './api/routes'
import { Database } from './services/database'

const nodeEnv: string = process.env.NODE_ENV as string

export const startServer = async (serverOptions: Options = {}) => {
  if (nodeEnv === 'test') {
    await redis.flushall()
  }

  const server = new GraphQLServer({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers(),
    context: ({ request, response }) => ({
      redis,
      request,
      response,
      requestUrl: `${request.protocol}://${request.get('host')}`,
      session: request.session
    })
  })

  server.express.use(rateLimiterMiddleware)
  server.express.use(sessionMiddleware)

  server.express.use(passport)
  server.express.use('/api', apiRoutes)

  await Database.createConnection()

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

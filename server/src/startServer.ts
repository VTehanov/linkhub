import 'reflect-metadata'
import 'dotenv/config'

import { GraphQLServer, Options } from 'graphql-yoga'
import { AddressInfo } from 'net'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'

import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createTypeormConn } from './utils/createTypeOrmConnection'
import { createTestConnection } from './utils/testUtils/createTestConnection'
import { redis } from './redis'
import { confirmEmail } from './routes/confirmEmail'

const SESSION_SECRET = 'TzDV8*JX.[FQ*/otGohL%izL'
const RedisStore = connectRedis(session)

const nodeEnv: string = process.env.NODE_ENV as string

export const startServer = async (serverOptions: Options = {}) => {
  const server = new GraphQLServer({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers(),
    context: ({ request }) => ({
      redis,
      requestUrl: `${request.protocol}://${request.get('host')}`,
      session: request.session
    })
  })

  if (nodeEnv === 'test') {
    await createTestConnection(true)
  } else {
    await createTypeormConn()
  }

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: nodeEnv === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  )

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

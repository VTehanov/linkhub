import 'reflect-metadata'

import { GraphQLServer, Options } from 'graphql-yoga'
import { AddressInfo } from 'net'
import * as Redis from 'ioredis'

import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createTypeormConn } from './utils/createTypeOrmConnection'
import { createTestConnection } from './utils/testUtils/createTestConnection'
import { User } from './entity/User'

export const startServer = async (serverOptions: Options = {}) => {
  const redis = new Redis()
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

  server.express.get('/confirm/:id', async (req, res) => {
    const { id } = req.params
    const userId = await redis.get(id)

    if (userId) {
      await User.update({ id: userId }, { confirmedEmail: true })
      await redis.del(id)
      res.send('ok')
    } else {
      res.send('invalid')
    }
  })

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

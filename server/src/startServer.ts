import 'reflect-metadata'
import 'dotenv/config'

import { GraphQLServer, Options } from 'graphql-yoga'
import { AddressInfo } from 'net'

import * as passport from 'passport'
import { Strategy } from 'passport-twitter'

import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createTypeormConn } from './utils/createTypeOrmConnection'
import { createTestConnection } from './utils/testUtils/createTestConnection'
import { redis } from './services/redis'
import { confirmEmail } from './routes/confirmEmail'
import { sessionMiddleware } from './middlewares/session'
import { rateLimiterMiddleware } from './middlewares/rateLimiter'
import { User } from './entity/User'
import { Connection } from 'typeorm'

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

  let connection: Connection
  if (nodeEnv === 'test') {
    connection = await createTestConnection(true)
  } else {
    connection = await createTypeormConn()
  }

  server.express.use(rateLimiterMiddleware)
  server.express.use(sessionMiddleware)

  server.express.get('/confirm/:id', confirmEmail)
  passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_API_KEY as string,
        consumerSecret: process.env.TWITTER_API_SECRET_KEY as string,
        callbackURL: 'http://localhost:4000/auth/twitter/callback',
        includeEmail: true
      },
      async (_, __, profile, cb) => {
        const { id, emails } = profile

        const query = connection
          .getRepository(User)
          .createQueryBuilder('user')
          .where('user.twitterId = :id', { id })

        let email: string | null = null

        if (emails) {
          email = emails[0].value
          query.orWhere('user.email = :email', { email })
        }

        let user = await query.getOne()

        if (!user) {
          user = await User.create({
            twitterId: id,
            email
          }).save()
        } else if (!user.twitterId) {
          user.twitterId = id
          await user.save()
        } else {
          // should login
        }

        return cb(null, { id: user.id })
      }
    )
  )

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  server.express.use(passport.initialize())

  server.express.get('/auth/twitter', passport.authenticate('twitter'))
  server.express.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

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

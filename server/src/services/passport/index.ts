import * as Passport from 'passport'
import { twitterStrategy } from './twitterStrategy'

Passport.use(twitterStrategy)

Passport.serializeUser((user, done) => done(null, user))

Passport.deserializeUser((user, done) => done(null, user))

export const passport = Passport.initialize()

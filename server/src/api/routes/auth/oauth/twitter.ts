import { Router } from 'express'
import * as Passport from 'passport'

export const twitterRoutes = Router()

twitterRoutes.get('/auth/twitter', Passport.authenticate('twitter'))
twitterRoutes.get(
  '/auth/twitter/callback',
  Passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

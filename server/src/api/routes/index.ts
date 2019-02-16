import { Router } from 'express'
import * as Passport from 'passport'

export const router = Router()

router.get('/auth/twitter', Passport.authenticate('twitter'))
router.get(
  '/auth/twitter/callback',
  Passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

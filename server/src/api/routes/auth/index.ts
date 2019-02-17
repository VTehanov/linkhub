import { Router } from 'express'
import { twitterRoutes } from './oauth/twitter'
import { confirmEmail } from './confirmEmail/confirmEmail'

export const authRoutes = Router()

authRoutes.use(twitterRoutes)
authRoutes.get('/confirm-email/:id', confirmEmail)

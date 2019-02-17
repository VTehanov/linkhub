import { Router } from 'express'
import { authRoutes } from './auth'

export const apiRoutes = Router()

apiRoutes.use('/auth', authRoutes)

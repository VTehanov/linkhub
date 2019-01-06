import { startServer } from '../../startServer'
import { seedData } from './seedData'

export const setup = async () => {
  const app = await startServer()

  await seedData()

  return app
}

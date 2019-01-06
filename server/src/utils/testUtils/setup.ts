import { startServer } from '../../startServer'
import { seedData } from './seedData'
import { AddressInfo } from 'net'

export const setup = async () => {
  const app = await startServer({ port: 0 })
  await seedData()

  const { port } = app.address() as AddressInfo
  process.env.TEST_HOST = `http://127.0.0.1:${port}`

  return app
}

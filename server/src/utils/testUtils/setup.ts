import { startServer } from '../../startServer'
import { User } from '../../entity/User'

export const setup = async () => {
  const app = await startServer()

  await User.create({
    email: 'test@mail.com'
  }).save()

  return app
}

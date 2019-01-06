import { User } from '../../entity/User'
import { users } from './seed/data'

export const seedData = () => {
  users.forEach(async u => await User.create(u).save())
}

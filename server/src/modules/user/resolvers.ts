import { User } from './User'

export const resolvers = {
  Mutation: {
    register: async (_: any, args: any) => {
      let newUser
      const { email } = args

      try {
        newUser = await User.create({
          email
        }).save()
      } catch (err) {
        console.log('Error', err)
      }
      return newUser
    }
  },
  Query: {
    hiUser(_: any, args: any) {
      return `Hi, ${args.name}`
    }
  }
}

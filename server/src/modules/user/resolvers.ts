export const resolvers = {
  Mutation: {
    createUser: async (
      _: any,
      args: any,
      ctx: any
    ) => {
      const { email } = args;
      const user = await ctx.db.mutation.createUser({
        data: {
          email
        }
      })

      return user
    }
  },
  Query: {
    hiUser(_: any, args: any) {
      return `Hi, ${args.name}`
    }
  }
};

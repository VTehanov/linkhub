export const resolvers = {
  Mutation: {
    createProject: async (
      _: any,
      args: any,
      ctx: any
    ) => {
      const { name, description } = args;
      const project = await ctx.db.mutation.createProject({
        data: {
          name,
          description
        }
      })

      return project
    }
  },
  Query: {
    hi(_: any, args: any) {
      return `Hi, ${args.name}`
    }
  }
}

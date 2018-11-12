import { GraphQLServer } from 'graphql-yoga'

const resolvers = {
  Query: {
    hi(_: any, args: any) {
      return `Hi, ${args.name}`
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req
  })
})

server.start(() => console.log('Server is running on http://localhost:4000'))
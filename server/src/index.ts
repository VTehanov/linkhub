import 'reflect-metadata'

import { GraphQLServer } from 'graphql-yoga'
import { getTypeDefs, getResolvers } from './utils/createSchema'
import { createConnection } from 'typeorm'
const connectionOptions = require('../ormconfig.json')

const server = new GraphQLServer({
  typeDefs: getTypeDefs(),
  resolvers: getResolvers()
})

createConnection(connectionOptions)

server.start(() => console.log('Server is running on localhost:4000'))

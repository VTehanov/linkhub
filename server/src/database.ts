import { Prisma } from 'prisma-binding'


const database = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'https://eu1.prisma.sh/vasil-tehanov/linkhub/dev',
  debug: true
})


export default database
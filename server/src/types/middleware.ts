import { MyContext } from './Context'
import { Resolver } from './resolver'

export type GraphQLMiddlewareFunction = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: MyContext,
  info: any
) => any

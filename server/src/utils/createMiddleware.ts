import { Resolver } from '../types/resolver'
import { GraphQLMiddlewareFunction } from '../types/middleware'

export const createMiddleware = (
  middlewareFunction: GraphQLMiddlewareFunction,
  resolverFunction: Resolver
) => (parent: any, args: any, context: any, info: any) =>
  middlewareFunction(resolverFunction, parent, args, context, info)

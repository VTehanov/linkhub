import { Resolver } from '../../../types/resolver'

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => await resolver(parent, args, context, info)

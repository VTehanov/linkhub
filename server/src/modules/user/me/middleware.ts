import { Resolver } from '../../../types/resolver'
import { MyContext } from '../../../types/Context'

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: MyContext,
  info: any
) => await resolver(parent, args, context, info)

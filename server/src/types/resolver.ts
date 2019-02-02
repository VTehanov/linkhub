import { MyContext } from './Context'

export type Resolver = (
  parent: any,
  args: any,
  context: MyContext,
  info: any
) => any

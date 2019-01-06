export type Maybe<T> = T | null

export interface RegisterInput {
  email: string
}
import { GraphQLResolveInfo } from 'graphql'

import { MyContext } from '../types/Context'

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export namespace QueryResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = {}> {
    hiUser?: HiUserResolver<string, TypeParent, Context>
  }

  export type HiUserResolver<
    R = string,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, HiUserArgs>
  export interface HiUserArgs {
    name: string
  }
}

export namespace MutationResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = {}> {
    register?: RegisterResolver<Maybe<User>, TypeParent, Context>
  }

  export type RegisterResolver<
    R = Maybe<User>,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, RegisterArgs>
  export interface RegisterArgs {
    input: RegisterInput
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>

    email?: EmailResolver<string, TypeParent, Context>
  }

  export type IdResolver<
    R = string,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type EmailResolver<
    R = string,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace RegisterResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = RegisterResponse
  > {
    user?: UserResolver<Maybe<User>, TypeParent, Context>

    errors?: ErrorsResolver<Maybe<string[]>, TypeParent, Context>
  }

  export type UserResolver<
    R = Maybe<User>,
    Parent = RegisterResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ErrorsResolver<
    R = Maybe<string[]>,
    Parent = RegisterResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  MyContext
>
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  MyContext
>
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  MyContext
>
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string
}

export interface IResolvers {
  Query?: QueryResolvers.Resolvers
  Mutation?: MutationResolvers.Resolvers
  User?: UserResolvers.Resolvers
  RegisterResponse?: RegisterResponseResolvers.Resolvers
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>
  include?: IncludeDirectiveResolver<Result>
  deprecated?: DeprecatedDirectiveResolver<Result>
}

// ====================================================
// Types
// ====================================================

export interface Query {
  hiUser: string
}

export interface Mutation {
  register?: Maybe<User>
}

export interface User {
  id: string

  email: string
}

export interface RegisterResponse {
  user?: Maybe<User>

  errors?: Maybe<string[]>
}

// ====================================================
// Arguments
// ====================================================

export interface HiUserQueryArgs {
  name: string
}
export interface RegisterMutationArgs {
  input: RegisterInput
}

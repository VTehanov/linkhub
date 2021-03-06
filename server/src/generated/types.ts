export type Maybe<T> = T | null

export interface GetProjectInput {
  slug: string
}

export interface GetProjectPendingRequestsInput {
  projectId: string
}

export interface GetProjectsByTagInput {
  slug: string
}

export interface CreateProjectInput {
  name: string

  description: string

  tags?: Maybe<string[]>
}

export interface RequestToJoinProjectInput {
  projectId: string

  message?: Maybe<string>
}

export interface RespondToJoinProjectInput {
  requestId: string

  status?: Maybe<ProjectJoinRequestStatusEnum>
}

export interface LoginInput {
  email: string

  password: string
}

export interface RegisterInput {
  email: string

  password: string
}

export enum ProjectJoinRequestStatusEnum {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Declined = 'DECLINED'
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
    getProject?: GetProjectResolver<
      Maybe<GetProjectResponse>,
      TypeParent,
      Context
    >

    getProjectPendingRequests?: GetProjectPendingRequestsResolver<
      GetProjectPendingRequestsResponse,
      TypeParent,
      Context
    >

    getProjects?: GetProjectsResolver<GetProjectsResponse, TypeParent, Context>

    getProjectsByTag?: GetProjectsByTagResolver<
      GetProjectsByTagResponse,
      TypeParent,
      Context
    >

    getTags?: GetTagsResolver<GetTagsResponse, TypeParent, Context>

    myProjects?: MyProjectsResolver<MyProjectsResponse, TypeParent, Context>

    me?: MeResolver<Maybe<User>, TypeParent, Context>

    hiUser?: HiUserResolver<string, TypeParent, Context>
  }

  export type GetProjectResolver<
    R = Maybe<GetProjectResponse>,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, GetProjectArgs>
  export interface GetProjectArgs {
    input: GetProjectInput
  }

  export type GetProjectPendingRequestsResolver<
    R = GetProjectPendingRequestsResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, GetProjectPendingRequestsArgs>
  export interface GetProjectPendingRequestsArgs {
    input: GetProjectPendingRequestsInput
  }

  export type GetProjectsResolver<
    R = GetProjectsResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type GetProjectsByTagResolver<
    R = GetProjectsByTagResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, GetProjectsByTagArgs>
  export interface GetProjectsByTagArgs {
    input: GetProjectsByTagInput
  }

  export type GetTagsResolver<
    R = GetTagsResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type MyProjectsResolver<
    R = MyProjectsResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type MeResolver<
    R = Maybe<User>,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type HiUserResolver<
    R = string,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, HiUserArgs>
  export interface HiUserArgs {
    name: string
  }
}

export namespace GetProjectResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = GetProjectResponse
  > {
    project?: ProjectResolver<Maybe<Project>, TypeParent, Context>
  }

  export type ProjectResolver<
    R = Maybe<Project>,
    Parent = GetProjectResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace ProjectResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = Project> {
    id?: IdResolver<string, TypeParent, Context>

    name?: NameResolver<string, TypeParent, Context>

    description?: DescriptionResolver<Maybe<string>, TypeParent, Context>

    progressStatus?: ProgressStatusResolver<string, TypeParent, Context>

    tags?: TagsResolver<Tag[], TypeParent, Context>

    creator?: CreatorResolver<User, TypeParent, Context>

    participants?: ParticipantsResolver<User[], TypeParent, Context>
  }

  export type IdResolver<
    R = string,
    Parent = Project,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type NameResolver<
    R = string,
    Parent = Project,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type DescriptionResolver<
    R = Maybe<string>,
    Parent = Project,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ProgressStatusResolver<
    R = string,
    Parent = Project,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type TagsResolver<
    R = Tag[],
    Parent = Project,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type CreatorResolver<
    R = User,
    Parent = Project,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ParticipantsResolver<
    R = User[],
    Parent = Project,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace TagResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = Tag> {
    id?: IdResolver<string, TypeParent, Context>

    name?: NameResolver<string, TypeParent, Context>

    slug?: SlugResolver<string, TypeParent, Context>

    projects?: ProjectsResolver<Project[], TypeParent, Context>
  }

  export type IdResolver<
    R = string,
    Parent = Tag,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type NameResolver<
    R = string,
    Parent = Tag,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type SlugResolver<
    R = string,
    Parent = Tag,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ProjectsResolver<
    R = Project[],
    Parent = Tag,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace UserResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>

    email?: EmailResolver<Maybe<string>, TypeParent, Context>

    confirmedEmail?: ConfirmedEmailResolver<boolean, TypeParent, Context>

    forgotPasswordLocked?: ForgotPasswordLockedResolver<
      boolean,
      TypeParent,
      Context
    >

    projects?: ProjectsResolver<Project[], TypeParent, Context>

    projectsJoined?: ProjectsJoinedResolver<Project[], TypeParent, Context>
  }

  export type IdResolver<
    R = string,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type EmailResolver<
    R = Maybe<string>,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ConfirmedEmailResolver<
    R = boolean,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ForgotPasswordLockedResolver<
    R = boolean,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ProjectsResolver<
    R = Project[],
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ProjectsJoinedResolver<
    R = Project[],
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace GetProjectPendingRequestsResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = GetProjectPendingRequestsResponse
  > {
    requests?: RequestsResolver<ProjectJoinRequest[], TypeParent, Context>
  }

  export type RequestsResolver<
    R = ProjectJoinRequest[],
    Parent = GetProjectPendingRequestsResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace ProjectJoinRequestResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = ProjectJoinRequest
  > {
    id?: IdResolver<string, TypeParent, Context>

    userId?: UserIdResolver<string, TypeParent, Context>

    message?: MessageResolver<Maybe<string>, TypeParent, Context>

    status?: StatusResolver<ProjectJoinRequestStatusEnum, TypeParent, Context>

    projectId?: ProjectIdResolver<string, TypeParent, Context>
  }

  export type IdResolver<
    R = string,
    Parent = ProjectJoinRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type UserIdResolver<
    R = string,
    Parent = ProjectJoinRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type MessageResolver<
    R = Maybe<string>,
    Parent = ProjectJoinRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type StatusResolver<
    R = ProjectJoinRequestStatusEnum,
    Parent = ProjectJoinRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ProjectIdResolver<
    R = string,
    Parent = ProjectJoinRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace GetProjectsResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = GetProjectsResponse
  > {
    projects?: ProjectsResolver<Project[], TypeParent, Context>
  }

  export type ProjectsResolver<
    R = Project[],
    Parent = GetProjectsResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace GetProjectsByTagResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = GetProjectsByTagResponse
  > {
    projects?: ProjectsResolver<Project[], TypeParent, Context>
  }

  export type ProjectsResolver<
    R = Project[],
    Parent = GetProjectsByTagResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace GetTagsResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = GetTagsResponse
  > {
    tags?: TagsResolver<Tag[], TypeParent, Context>
  }

  export type TagsResolver<
    R = Tag[],
    Parent = GetTagsResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace MyProjectsResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = MyProjectsResponse
  > {
    projects?: ProjectsResolver<Project[], TypeParent, Context>
  }

  export type ProjectsResolver<
    R = Project[],
    Parent = MyProjectsResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace MutationResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = {}> {
    createProject?: CreateProjectResolver<
      CreateProjectResponse,
      TypeParent,
      Context
    >

    requestToJoinProject?: RequestToJoinProjectResolver<
      RequestToJoinProjectResponse,
      TypeParent,
      Context
    >

    respondToJoinRequest?: RespondToJoinRequestResolver<
      Maybe<RequestToJoinProjectResponse>,
      TypeParent,
      Context
    >

    sendForgotPasswordEmail?: SendForgotPasswordEmailResolver<
      Maybe<boolean>,
      TypeParent,
      Context
    >

    forgotPasswordChange?: ForgotPasswordChangeResolver<
      Maybe<Error[]>,
      TypeParent,
      Context
    >

    login?: LoginResolver<LoginResponse, TypeParent, Context>

    logout?: LogoutResolver<Maybe<boolean>, TypeParent, Context>

    register?: RegisterResolver<RegisterResponse, TypeParent, Context>
  }

  export type CreateProjectResolver<
    R = CreateProjectResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, CreateProjectArgs>
  export interface CreateProjectArgs {
    input: CreateProjectInput
  }

  export type RequestToJoinProjectResolver<
    R = RequestToJoinProjectResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, RequestToJoinProjectArgs>
  export interface RequestToJoinProjectArgs {
    input: RequestToJoinProjectInput
  }

  export type RespondToJoinRequestResolver<
    R = Maybe<RequestToJoinProjectResponse>,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, RespondToJoinRequestArgs>
  export interface RespondToJoinRequestArgs {
    input: RespondToJoinProjectInput
  }

  export type SendForgotPasswordEmailResolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, SendForgotPasswordEmailArgs>
  export interface SendForgotPasswordEmailArgs {
    email: string
  }

  export type ForgotPasswordChangeResolver<
    R = Maybe<Error[]>,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, ForgotPasswordChangeArgs>
  export interface ForgotPasswordChangeArgs {
    newPassword: string

    key: string
  }

  export type LoginResolver<
    R = LoginResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, LoginArgs>
  export interface LoginArgs {
    input: LoginInput
  }

  export type LogoutResolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type RegisterResolver<
    R = RegisterResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, RegisterArgs>
  export interface RegisterArgs {
    input: RegisterInput
  }
}

export namespace CreateProjectResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = CreateProjectResponse
  > {
    errors?: ErrorsResolver<Error[], TypeParent, Context>

    project?: ProjectResolver<Maybe<Project>, TypeParent, Context>
  }

  export type ErrorsResolver<
    R = Error[],
    Parent = CreateProjectResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type ProjectResolver<
    R = Maybe<Project>,
    Parent = CreateProjectResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace ErrorResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = Error> {
    path?: PathResolver<string, TypeParent, Context>

    message?: MessageResolver<string, TypeParent, Context>
  }

  export type PathResolver<
    R = string,
    Parent = Error,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type MessageResolver<
    R = string,
    Parent = Error,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace RequestToJoinProjectResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = RequestToJoinProjectResponse
  > {
    errors?: ErrorsResolver<Maybe<Error[]>, TypeParent, Context>
  }

  export type ErrorsResolver<
    R = Maybe<Error[]>,
    Parent = RequestToJoinProjectResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace LoginResponseResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = LoginResponse> {
    errors?: ErrorsResolver<Maybe<Error[]>, TypeParent, Context>

    user?: UserResolver<Maybe<User>, TypeParent, Context>
  }

  export type ErrorsResolver<
    R = Maybe<Error[]>,
    Parent = LoginResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type UserResolver<
    R = Maybe<User>,
    Parent = LoginResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
}

export namespace RegisterResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = RegisterResponse
  > {
    errors?: ErrorsResolver<Maybe<Error[]>, TypeParent, Context>

    user?: UserResolver<Maybe<User>, TypeParent, Context>
  }

  export type ErrorsResolver<
    R = Maybe<Error[]>,
    Parent = RegisterResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>
  export type UserResolver<
    R = Maybe<User>,
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
  GetProjectResponse?: GetProjectResponseResolvers.Resolvers
  Project?: ProjectResolvers.Resolvers
  Tag?: TagResolvers.Resolvers
  User?: UserResolvers.Resolvers
  GetProjectPendingRequestsResponse?: GetProjectPendingRequestsResponseResolvers.Resolvers
  ProjectJoinRequest?: ProjectJoinRequestResolvers.Resolvers
  GetProjectsResponse?: GetProjectsResponseResolvers.Resolvers
  GetProjectsByTagResponse?: GetProjectsByTagResponseResolvers.Resolvers
  GetTagsResponse?: GetTagsResponseResolvers.Resolvers
  MyProjectsResponse?: MyProjectsResponseResolvers.Resolvers
  Mutation?: MutationResolvers.Resolvers
  CreateProjectResponse?: CreateProjectResponseResolvers.Resolvers
  Error?: ErrorResolvers.Resolvers
  RequestToJoinProjectResponse?: RequestToJoinProjectResponseResolvers.Resolvers
  LoginResponse?: LoginResponseResolvers.Resolvers
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
  getProject?: Maybe<GetProjectResponse>

  getProjectPendingRequests: GetProjectPendingRequestsResponse

  getProjects: GetProjectsResponse

  getProjectsByTag: GetProjectsByTagResponse

  getTags: GetTagsResponse

  myProjects: MyProjectsResponse

  me?: Maybe<User>

  hiUser: string
}

export interface GetProjectResponse {
  project?: Maybe<Project>
}

export interface Project {
  id: string

  name: string

  description?: Maybe<string>

  progressStatus: string

  tags: Tag[]

  creator: User

  participants: User[]
}

export interface Tag {
  id: string

  name: string

  slug: string

  projects: Project[]
}

export interface User {
  id: string

  email?: Maybe<string>

  confirmedEmail: boolean

  forgotPasswordLocked: boolean

  projects: Project[]

  projectsJoined: Project[]
}

export interface GetProjectPendingRequestsResponse {
  requests: ProjectJoinRequest[]
}

export interface ProjectJoinRequest {
  id: string

  userId: string

  message?: Maybe<string>

  status: ProjectJoinRequestStatusEnum

  projectId: string
}

export interface GetProjectsResponse {
  projects: Project[]
}

export interface GetProjectsByTagResponse {
  projects: Project[]
}

export interface GetTagsResponse {
  tags: Tag[]
}

export interface MyProjectsResponse {
  projects: Project[]
}

export interface Mutation {
  createProject: CreateProjectResponse

  requestToJoinProject: RequestToJoinProjectResponse

  respondToJoinRequest?: Maybe<RequestToJoinProjectResponse>

  sendForgotPasswordEmail?: Maybe<boolean>

  forgotPasswordChange?: Maybe<Error[]>

  login: LoginResponse

  logout?: Maybe<boolean>

  register: RegisterResponse
}

export interface CreateProjectResponse {
  errors: Error[]

  project?: Maybe<Project>
}

export interface Error {
  path: string

  message: string
}

export interface RequestToJoinProjectResponse {
  errors?: Maybe<Error[]>
}

export interface LoginResponse {
  errors?: Maybe<Error[]>

  user?: Maybe<User>
}

export interface RegisterResponse {
  errors?: Maybe<Error[]>

  user?: Maybe<User>
}

// ====================================================
// Arguments
// ====================================================

export interface GetProjectQueryArgs {
  input: GetProjectInput
}
export interface GetProjectPendingRequestsQueryArgs {
  input: GetProjectPendingRequestsInput
}
export interface GetProjectsByTagQueryArgs {
  input: GetProjectsByTagInput
}
export interface HiUserQueryArgs {
  name: string
}
export interface CreateProjectMutationArgs {
  input: CreateProjectInput
}
export interface RequestToJoinProjectMutationArgs {
  input: RequestToJoinProjectInput
}
export interface RespondToJoinRequestMutationArgs {
  input: RespondToJoinProjectInput
}
export interface SendForgotPasswordEmailMutationArgs {
  email: string
}
export interface ForgotPasswordChangeMutationArgs {
  newPassword: string

  key: string
}
export interface LoginMutationArgs {
  input: LoginInput
}
export interface RegisterMutationArgs {
  input: RegisterInput
}

type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Component = {
  id: Scalars['ID']
  name: Scalars['String']
  team: Team
  examples: Array<Example>
}

export type Config = {
  figmaAuthUrl: Scalars['String']
  githubAuthUrl: Scalars['String']
  logoutUrl: Scalars['String']
}

export type CreateComponentInput = {
  teamId: Scalars['ID']
  name: Scalars['String']
}

export type CreateComponentResponse = {
  component?: Maybe<Component>
  status: MutationStatus
}

export type CreateExampleInput = {
  componentId: Scalars['ID']
  name: Scalars['String']
}

export type CreateExampleResponse = {
  example?: Maybe<Example>
  status: MutationStatus
}

export type CreateTeamInput = {
  name: Scalars['String']
  figmaTeamId?: Maybe<Scalars['String']>
}

export type CreateTeamResponse = {
  team?: Maybe<Team>
  status: MutationStatus
}

export type Example = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  component: Component
  renders: Array<Maybe<Render>>
}

export type LogoutResponse = {
  status?: Maybe<MutationStatus>
}

export type Mutation = {
  logout?: Maybe<LogoutResponse>
  createTeam?: Maybe<CreateTeamResponse>
  createComponent?: Maybe<CreateComponentResponse>
  createExample?: Maybe<CreateExampleResponse>
  renderExample?: Maybe<RenderExampleResponse>
}

export type MutationCreateTeamArgs = {
  input: CreateTeamInput
}

export type MutationCreateComponentArgs = {
  input: CreateComponentInput
}

export type MutationCreateExampleArgs = {
  input: CreateExampleInput
}

export type MutationRenderExampleArgs = {
  input: RenderExampleInput
}

export type MutationError = {
  field?: Maybe<Scalars['String']>
  message: Scalars['String']
}

export type MutationStatus = {
  success: Scalars['Boolean']
  errors?: Maybe<Array<MutationError>>
}

export type Query = {
  hello: Scalars['String']
  config: Config
  currentUser?: Maybe<User>
  teams: Array<Team>
  team?: Maybe<Team>
}

export type QueryTeamArgs = {
  id: Scalars['ID']
}

export type Render = {
  id: Scalars['ID']
  imageUrl: Scalars['String']
  example: Example
}

export type RenderExampleInput = {
  exampleId: Scalars['ID']
}

export type RenderExampleResponse = {
  render?: Maybe<Render>
  status: MutationStatus
}

export type Team = {
  id: Scalars['ID']
  name: Scalars['String']
  role: Scalars['String']
  components: Array<Component>
}

export type User = {
  id: Scalars['ID']
  name: Scalars['String']
  figmaConnected: Scalars['Boolean']
  githubConnected: Scalars['Boolean']
}
import { User, Team, Component, Example, Render } from 'api/prisma'
import { ReflexContex } from 'api/graphql/Context'

import { GraphQLResolveInfo } from 'graphql'

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export type ComponentResolvers<
  Context = ReflexContex,
  ParentType = Component
> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  team?: Resolver<Team, ParentType, Context>
  examples?: Resolver<Array<Example>, ParentType, Context>
}

export type ConfigResolvers<Context = ReflexContex, ParentType = Config> = {
  figmaAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  githubAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  logoutUrl?: Resolver<Scalars['String'], ParentType, Context>
}

export type CreateComponentResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateComponentResponse
> = {
  component?: Resolver<Maybe<Component>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type CreateExampleResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateExampleResponse
> = {
  example?: Resolver<Maybe<Example>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type CreateTeamResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateTeamResponse
> = {
  team?: Resolver<Maybe<Team>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type ExampleResolvers<Context = ReflexContex, ParentType = Example> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  slug?: Resolver<Scalars['String'], ParentType, Context>
  component?: Resolver<Component, ParentType, Context>
  renders?: Resolver<Array<Maybe<Render>>, ParentType, Context>
}

export type LogoutResponseResolvers<
  Context = ReflexContex,
  ParentType = LogoutResponse
> = {
  status?: Resolver<Maybe<MutationStatus>, ParentType, Context>
}

export type MutationResolvers<Context = ReflexContex, ParentType = Mutation> = {
  logout?: Resolver<Maybe<LogoutResponse>, ParentType, Context>
  createTeam?: Resolver<
    Maybe<CreateTeamResponse>,
    ParentType,
    Context,
    MutationCreateTeamArgs
  >
  createComponent?: Resolver<
    Maybe<CreateComponentResponse>,
    ParentType,
    Context,
    MutationCreateComponentArgs
  >
  createExample?: Resolver<
    Maybe<CreateExampleResponse>,
    ParentType,
    Context,
    MutationCreateExampleArgs
  >
  renderExample?: Resolver<
    Maybe<RenderExampleResponse>,
    ParentType,
    Context,
    MutationRenderExampleArgs
  >
}

export type MutationErrorResolvers<
  Context = ReflexContex,
  ParentType = MutationError
> = {
  field?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
  message?: Resolver<Scalars['String'], ParentType, Context>
}

export type MutationStatusResolvers<
  Context = ReflexContex,
  ParentType = MutationStatus
> = {
  success?: Resolver<Scalars['Boolean'], ParentType, Context>
  errors?: Resolver<Maybe<Array<MutationError>>, ParentType, Context>
}

export type QueryResolvers<Context = ReflexContex, ParentType = Query> = {
  hello?: Resolver<Scalars['String'], ParentType, Context>
  config?: Resolver<Config, ParentType, Context>
  currentUser?: Resolver<Maybe<User>, ParentType, Context>
  teams?: Resolver<Array<Team>, ParentType, Context>
  team?: Resolver<Maybe<Team>, ParentType, Context, QueryTeamArgs>
}

export type RenderResolvers<Context = ReflexContex, ParentType = Render> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  imageUrl?: Resolver<Scalars['String'], ParentType, Context>
  example?: Resolver<Example, ParentType, Context>
}

export type RenderExampleResponseResolvers<
  Context = ReflexContex,
  ParentType = RenderExampleResponse
> = {
  render?: Resolver<Maybe<Render>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type TeamResolvers<Context = ReflexContex, ParentType = Team> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  role?: Resolver<Scalars['String'], ParentType, Context>
  components?: Resolver<Array<Component>, ParentType, Context>
}

export type UserResolvers<Context = ReflexContex, ParentType = User> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  figmaConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
  githubConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
}

export type Resolvers<Context = ReflexContex> = {
  Component?: ComponentResolvers<Context>
  Config?: ConfigResolvers<Context>
  CreateComponentResponse?: CreateComponentResponseResolvers<Context>
  CreateExampleResponse?: CreateExampleResponseResolvers<Context>
  CreateTeamResponse?: CreateTeamResponseResolvers<Context>
  Example?: ExampleResolvers<Context>
  LogoutResponse?: LogoutResponseResolvers<Context>
  Mutation?: MutationResolvers<Context>
  MutationError?: MutationErrorResolvers<Context>
  MutationStatus?: MutationStatusResolvers<Context>
  Query?: QueryResolvers<Context>
  Render?: RenderResolvers<Context>
  RenderExampleResponse?: RenderExampleResponseResolvers<Context>
  Team?: TeamResolvers<Context>
  User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
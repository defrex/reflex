type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CliAuthSession = {
  url: Scalars['String']
  cliAuthToken: Scalars['String']
  userAuthToken?: Maybe<Scalars['String']>
}

export type Component = {
  id: Scalars['ID']
  name: Scalars['String']
  team: Team
  samples: Array<Sample>
}

export type Config = {
  figmaAuthUrl: Scalars['String']
  githubAuthUrl: Scalars['String']
  logoutUrl: Scalars['String']
}

export type CreateCliAuthSessionResponse = {
  cliAuthSession?: Maybe<CliAuthSession>
  status: MutationStatus
}

export type CreateComponentInput = {
  teamId: Scalars['ID']
  name: Scalars['String']
}

export type CreateComponentResponse = {
  component?: Maybe<Component>
  status: MutationStatus
}

export type CreateRenderInput = {
  componentName: Scalars['String']
  sampleName: Scalars['String']
  html: Scalars['String']
  imageUrl?: Maybe<Scalars['String']>
  branch: Scalars['String']
  commit: Scalars['String']
}

export type CreateRenderResponse = {
  render?: Maybe<Render>
  status: MutationStatus
}

export type CreateSampleInput = {
  componentId: Scalars['ID']
  name: Scalars['String']
}

export type CreateSampleResponse = {
  sample?: Maybe<Sample>
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

export type LogoutResponse = {
  status?: Maybe<MutationStatus>
}

export type Mutation = {
  logout?: Maybe<LogoutResponse>
  createCliAuthSession?: Maybe<CreateCliAuthSessionResponse>
  createTeam?: Maybe<CreateTeamResponse>
  createComponent?: Maybe<CreateComponentResponse>
  createSample?: Maybe<CreateSampleResponse>
  createRender?: Maybe<CreateRenderResponse>
}

export type MutationCreateTeamArgs = {
  input: CreateTeamInput
}

export type MutationCreateComponentArgs = {
  input: CreateComponentInput
}

export type MutationCreateSampleArgs = {
  input: CreateSampleInput
}

export type MutationCreateRenderArgs = {
  input: CreateRenderInput
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
  cliAuthSession?: Maybe<CliAuthSession>
  teams: Array<Team>
  team?: Maybe<Team>
}

export type QueryCliAuthSessionArgs = {
  cliAuthToken: Scalars['String']
}

export type QueryTeamArgs = {
  id: Scalars['ID']
}

export type Render = {
  id: Scalars['ID']
  imageUrl?: Maybe<Scalars['String']>
  html?: Maybe<Scalars['String']>
  sample: Sample
}

export type Sample = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  component: Component
  renders: Array<Maybe<Render>>
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
import {
  User,
  Team,
  Component,
  Sample,
  Render,
  CliAuthSession,
} from 'api/prisma'
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

export type CliAuthSessionResolvers<
  Context = ReflexContex,
  ParentType = CliAuthSession
> = {
  url?: Resolver<Scalars['String'], ParentType, Context>
  cliAuthToken?: Resolver<Scalars['String'], ParentType, Context>
  userAuthToken?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
}

export type ComponentResolvers<
  Context = ReflexContex,
  ParentType = Component
> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  team?: Resolver<Team, ParentType, Context>
  samples?: Resolver<Array<Sample>, ParentType, Context>
}

export type ConfigResolvers<Context = ReflexContex, ParentType = Config> = {
  figmaAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  githubAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  logoutUrl?: Resolver<Scalars['String'], ParentType, Context>
}

export type CreateCliAuthSessionResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateCliAuthSessionResponse
> = {
  cliAuthSession?: Resolver<Maybe<CliAuthSession>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type CreateComponentResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateComponentResponse
> = {
  component?: Resolver<Maybe<Component>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type CreateRenderResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateRenderResponse
> = {
  render?: Resolver<Maybe<Render>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type CreateSampleResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateSampleResponse
> = {
  sample?: Resolver<Maybe<Sample>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type CreateTeamResponseResolvers<
  Context = ReflexContex,
  ParentType = CreateTeamResponse
> = {
  team?: Resolver<Maybe<Team>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type LogoutResponseResolvers<
  Context = ReflexContex,
  ParentType = LogoutResponse
> = {
  status?: Resolver<Maybe<MutationStatus>, ParentType, Context>
}

export type MutationResolvers<Context = ReflexContex, ParentType = Mutation> = {
  logout?: Resolver<Maybe<LogoutResponse>, ParentType, Context>
  createCliAuthSession?: Resolver<
    Maybe<CreateCliAuthSessionResponse>,
    ParentType,
    Context
  >
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
  createSample?: Resolver<
    Maybe<CreateSampleResponse>,
    ParentType,
    Context,
    MutationCreateSampleArgs
  >
  createRender?: Resolver<
    Maybe<CreateRenderResponse>,
    ParentType,
    Context,
    MutationCreateRenderArgs
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
  cliAuthSession?: Resolver<
    Maybe<CliAuthSession>,
    ParentType,
    Context,
    QueryCliAuthSessionArgs
  >
  teams?: Resolver<Array<Team>, ParentType, Context>
  team?: Resolver<Maybe<Team>, ParentType, Context, QueryTeamArgs>
}

export type RenderResolvers<Context = ReflexContex, ParentType = Render> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  imageUrl?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
  html?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
  sample?: Resolver<Sample, ParentType, Context>
}

export type SampleResolvers<Context = ReflexContex, ParentType = Sample> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  slug?: Resolver<Scalars['String'], ParentType, Context>
  component?: Resolver<Component, ParentType, Context>
  renders?: Resolver<Array<Maybe<Render>>, ParentType, Context>
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
  CliAuthSession?: CliAuthSessionResolvers<Context>
  Component?: ComponentResolvers<Context>
  Config?: ConfigResolvers<Context>
  CreateCliAuthSessionResponse?: CreateCliAuthSessionResponseResolvers<Context>
  CreateComponentResponse?: CreateComponentResponseResolvers<Context>
  CreateRenderResponse?: CreateRenderResponseResolvers<Context>
  CreateSampleResponse?: CreateSampleResponseResolvers<Context>
  CreateTeamResponse?: CreateTeamResponseResolvers<Context>
  LogoutResponse?: LogoutResponseResolvers<Context>
  Mutation?: MutationResolvers<Context>
  MutationError?: MutationErrorResolvers<Context>
  MutationStatus?: MutationStatusResolvers<Context>
  Query?: QueryResolvers<Context>
  Render?: RenderResolvers<Context>
  Sample?: SampleResolvers<Context>
  Team?: TeamResolvers<Context>
  User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
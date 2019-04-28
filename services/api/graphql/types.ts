export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Check = {
  id: Scalars['ID']
  githubCheckId?: Maybe<Scalars['Int']>
  branch: Scalars['String']
  commit: Scalars['String']
  repoArchiveUrl?: Maybe<Scalars['String']>
  repo?: Maybe<Repo>
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

export type Mutation = {
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
  check?: Maybe<Check>
}

export type QueryCliAuthSessionArgs = {
  cliAuthToken: Scalars['String']
}

export type QueryTeamArgs = {
  id: Scalars['ID']
}

export type QueryCheckArgs = {
  id: Scalars['ID']
}

export type Render = {
  id: Scalars['ID']
  createdAt: Scalars['String']
  imageUrl?: Maybe<Scalars['String']>
  html: Scalars['String']
  branch: Scalars['String']
  commit: Scalars['String']
  sample: Sample
}

export type Repo = {
  id: Scalars['ID']
  owner: Scalars['String']
  name: Scalars['String']
  checks: Array<Maybe<Check>>
}

export type Sample = {
  id: Scalars['ID']
  name: Scalars['String']
  component: Component
  renders: Array<Render>
}

export type Team = {
  id: Scalars['ID']
  name: Scalars['String']
  role: Scalars['String']
  component?: Maybe<Component>
  components: Array<Component>
}

export type TeamComponentArgs = {
  id: Scalars['ID']
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
  Check,
  Repo,
} from 'api/prisma'
import { ReflexContex } from 'services/api/graphql/Context'

import { GraphQLResolveInfo } from 'graphql'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {}
  String: Scalars['String']
  Config: Config
  User: User
  ID: Scalars['ID']
  Boolean: Scalars['Boolean']
  CliAuthSession: CliAuthSession
  Team: Team
  Component: Component
  Sample: Sample
  Render: Render
  Check: Check
  Int: Scalars['Int']
  Repo: Repo
  Mutation: {}
  CreateCliAuthSessionResponse: Omit<
    CreateCliAuthSessionResponse,
    'cliAuthSession'
  > & { cliAuthSession?: Maybe<ResolversTypes['CliAuthSession']> }
  MutationStatus: MutationStatus
  MutationError: MutationError
  CreateTeamInput: CreateTeamInput
  CreateTeamResponse: Omit<CreateTeamResponse, 'team'> & {
    team?: Maybe<ResolversTypes['Team']>
  }
  CreateComponentInput: CreateComponentInput
  CreateComponentResponse: Omit<CreateComponentResponse, 'component'> & {
    component?: Maybe<ResolversTypes['Component']>
  }
  CreateSampleInput: CreateSampleInput
  CreateSampleResponse: Omit<CreateSampleResponse, 'sample'> & {
    sample?: Maybe<ResolversTypes['Sample']>
  }
  CreateRenderInput: CreateRenderInput
  CreateRenderResponse: Omit<CreateRenderResponse, 'render'> & {
    render?: Maybe<ResolversTypes['Render']>
  }
}

export type CheckResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Check']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  githubCheckId?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  commit?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  repoArchiveUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  repo?: Resolver<Maybe<ResolversTypes['Repo']>, ParentType, ContextType>
}

export type CliAuthSessionResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['CliAuthSession']
> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  cliAuthToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userAuthToken?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
}

export type ComponentResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Component']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType>
  samples?: Resolver<Array<ResolversTypes['Sample']>, ParentType, ContextType>
}

export type ConfigResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Config']
> = {
  figmaAuthUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  githubAuthUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type CreateCliAuthSessionResponseResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['CreateCliAuthSessionResponse']
> = {
  cliAuthSession?: Resolver<
    Maybe<ResolversTypes['CliAuthSession']>,
    ParentType,
    ContextType
  >
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>
}

export type CreateComponentResponseResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['CreateComponentResponse']
> = {
  component?: Resolver<
    Maybe<ResolversTypes['Component']>,
    ParentType,
    ContextType
  >
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>
}

export type CreateRenderResponseResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['CreateRenderResponse']
> = {
  render?: Resolver<Maybe<ResolversTypes['Render']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>
}

export type CreateSampleResponseResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['CreateSampleResponse']
> = {
  sample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>
}

export type CreateTeamResponseResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['CreateTeamResponse']
> = {
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['MutationStatus'], ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Mutation']
> = {
  createCliAuthSession?: Resolver<
    Maybe<ResolversTypes['CreateCliAuthSessionResponse']>,
    ParentType,
    ContextType
  >
  createTeam?: Resolver<
    Maybe<ResolversTypes['CreateTeamResponse']>,
    ParentType,
    ContextType,
    MutationCreateTeamArgs
  >
  createComponent?: Resolver<
    Maybe<ResolversTypes['CreateComponentResponse']>,
    ParentType,
    ContextType,
    MutationCreateComponentArgs
  >
  createSample?: Resolver<
    Maybe<ResolversTypes['CreateSampleResponse']>,
    ParentType,
    ContextType,
    MutationCreateSampleArgs
  >
  createRender?: Resolver<
    Maybe<ResolversTypes['CreateRenderResponse']>,
    ParentType,
    ContextType,
    MutationCreateRenderArgs
  >
}

export type MutationErrorResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['MutationError']
> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type MutationStatusResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['MutationStatus']
> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  errors?: Resolver<
    Maybe<Array<ResolversTypes['MutationError']>>,
    ParentType,
    ContextType
  >
}

export type QueryResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Query']
> = {
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  config?: Resolver<ResolversTypes['Config'], ParentType, ContextType>
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  cliAuthSession?: Resolver<
    Maybe<ResolversTypes['CliAuthSession']>,
    ParentType,
    ContextType,
    QueryCliAuthSessionArgs
  >
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>
  team?: Resolver<
    Maybe<ResolversTypes['Team']>,
    ParentType,
    ContextType,
    QueryTeamArgs
  >
  check?: Resolver<
    Maybe<ResolversTypes['Check']>,
    ParentType,
    ContextType,
    QueryCheckArgs
  >
}

export type RenderResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Render']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  html?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  commit?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  sample?: Resolver<ResolversTypes['Sample'], ParentType, ContextType>
}

export type RepoResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Repo']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  checks?: Resolver<
    Array<Maybe<ResolversTypes['Check']>>,
    ParentType,
    ContextType
  >
}

export type SampleResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Sample']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  component?: Resolver<ResolversTypes['Component'], ParentType, ContextType>
  renders?: Resolver<Array<ResolversTypes['Render']>, ParentType, ContextType>
}

export type TeamResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['Team']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  component?: Resolver<
    Maybe<ResolversTypes['Component']>,
    ParentType,
    ContextType,
    TeamComponentArgs
  >
  components?: Resolver<
    Array<ResolversTypes['Component']>,
    ParentType,
    ContextType
  >
}

export type UserResolvers<
  ContextType = ReflexContex,
  ParentType = ResolversTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  figmaConnected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  githubConnected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type Resolvers<ContextType = ReflexContex> = {
  Check?: CheckResolvers<ContextType>
  CliAuthSession?: CliAuthSessionResolvers<ContextType>
  Component?: ComponentResolvers<ContextType>
  Config?: ConfigResolvers<ContextType>
  CreateCliAuthSessionResponse?: CreateCliAuthSessionResponseResolvers<
    ContextType
  >
  CreateComponentResponse?: CreateComponentResponseResolvers<ContextType>
  CreateRenderResponse?: CreateRenderResponseResolvers<ContextType>
  CreateSampleResponse?: CreateSampleResponseResolvers<ContextType>
  CreateTeamResponse?: CreateTeamResponseResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  MutationError?: MutationErrorResolvers<ContextType>
  MutationStatus?: MutationStatusResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Render?: RenderResolvers<ContextType>
  Repo?: RepoResolvers<ContextType>
  Sample?: SampleResolvers<ContextType>
  Team?: TeamResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
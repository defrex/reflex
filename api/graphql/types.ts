type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Config = {
  figmaAuthUrl: Scalars['String']
  githubAuthUrl: Scalars['String']
  logoutUrl: Scalars['String']
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
  createTeam?: Maybe<CreateTeamResponse>
}

export type MutationCreateTeamArgs = {
  input: CreateTeamInput
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

export type Team = {
  id: Scalars['ID']
  name: Scalars['String']
  role: Scalars['String']
}

export type User = {
  id: Scalars['ID']
  name: Scalars['String']
  figmaConnected: Scalars['Boolean']
  githubConnected: Scalars['Boolean']
}
import { User, Team } from 'api/prisma'
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

export type ConfigResolvers<Context = ReflexContex, ParentType = Config> = {
  figmaAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  githubAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  logoutUrl?: Resolver<Scalars['String'], ParentType, Context>
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
  createTeam?: Resolver<
    Maybe<CreateTeamResponse>,
    ParentType,
    Context,
    MutationCreateTeamArgs
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

export type TeamResolvers<Context = ReflexContex, ParentType = Team> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  role?: Resolver<Scalars['String'], ParentType, Context>
}

export type UserResolvers<Context = ReflexContex, ParentType = User> = {
  id?: Resolver<Scalars['ID'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  figmaConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
  githubConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
}

export type Resolvers<Context = ReflexContex> = {
  Config?: ConfigResolvers<Context>
  CreateTeamResponse?: CreateTeamResponseResolvers<Context>
  LogoutResponse?: LogoutResponseResolvers<Context>
  Mutation?: MutationResolvers<Context>
  MutationError?: MutationErrorResolvers<Context>
  MutationStatus?: MutationStatusResolvers<Context>
  Query?: QueryResolvers<Context>
  Team?: TeamResolvers<Context>
  User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
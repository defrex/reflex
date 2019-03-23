type Maybe<T> = T | null
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

export type CreateOrganizationInput = {
  name: Scalars['String']
  figmaTeamId?: Maybe<Scalars['String']>
}

export type CreateOrganizationResponse = {
  organization?: Maybe<Organization>
  status: MutationStatus
}

export type CreateUserInput = {
  name: Scalars['String']
  email: Scalars['String']
}

export type CreateUserResponse = {
  user?: Maybe<User>
  status?: Maybe<MutationStatus>
}

export type GithubCheck = {
  id: Scalars['Int']
  repoOwner: Scalars['String']
  repoName: Scalars['String']
  commitSha: Scalars['String']
  githubCheckId?: Maybe<Scalars['Int']>
}

export type LogoutResponse = {
  status?: Maybe<MutationStatus>
}

export type Mutation = {
  createUser?: Maybe<CreateUserResponse>
  logout?: Maybe<LogoutResponse>
  createOrganization?: Maybe<CreateOrganizationResponse>
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput
}

export type MutationError = {
  field?: Maybe<Scalars['String']>
  message: Scalars['String']
}

export type MutationStatus = {
  success: Scalars['Boolean']
  errors?: Maybe<Array<MutationError>>
}

export type Organization = {
  id: Scalars['Int']
  name: Scalars['String']
  figmaTeamId?: Maybe<Scalars['String']>
}

export type Query = {
  hello: Scalars['String']
  config: Config
  githubChecks: Array<Maybe<GithubCheck>>
  githubCheck?: Maybe<GithubCheck>
  currentUser?: Maybe<User>
  organizations: Array<Organization>
  organization?: Maybe<Organization>
}

export type QueryGithubChecksArgs = {
  repoOwner: Scalars['String']
  repoName?: Maybe<Scalars['String']>
}

export type QueryGithubCheckArgs = {
  repoOwner: Scalars['String']
  repoName: Scalars['String']
  commitSha: Scalars['String']
}

export type QueryOrganizationArgs = {
  id: Scalars['Int']
}

export type User = {
  id: Scalars['Int']
  name: Scalars['String']
  figmaConnected: Scalars['Boolean']
  githubConnected: Scalars['Boolean']
}

import { GraphQLResolveInfo } from 'graphql'

export type ArrayOrIterable<T> = Array<T> | Iterable<T>

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

export interface ISubscriptionResolverObject<
  TResult,
  TParent,
  TContext,
  TArgs
> {
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
    ) => ISubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | ISubscriptionResolverObject<TResult, TParent, TContext, TArgs>

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

export type ConfigResolvers<Context = any, ParentType = Config> = {
  figmaAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  githubAuthUrl?: Resolver<Scalars['String'], ParentType, Context>
  logoutUrl?: Resolver<Scalars['String'], ParentType, Context>
}

export type CreateOrganizationResponseResolvers<
  Context = any,
  ParentType = CreateOrganizationResponse
> = {
  organization?: Resolver<Maybe<Organization>, ParentType, Context>
  status?: Resolver<MutationStatus, ParentType, Context>
}

export type CreateUserResponseResolvers<
  Context = any,
  ParentType = CreateUserResponse
> = {
  user?: Resolver<Maybe<User>, ParentType, Context>
  status?: Resolver<Maybe<MutationStatus>, ParentType, Context>
}

export type GithubCheckResolvers<Context = any, ParentType = GithubCheck> = {
  id?: Resolver<Scalars['Int'], ParentType, Context>
  repoOwner?: Resolver<Scalars['String'], ParentType, Context>
  repoName?: Resolver<Scalars['String'], ParentType, Context>
  commitSha?: Resolver<Scalars['String'], ParentType, Context>
  githubCheckId?: Resolver<Maybe<Scalars['Int']>, ParentType, Context>
}

export type LogoutResponseResolvers<
  Context = any,
  ParentType = LogoutResponse
> = {
  status?: Resolver<Maybe<MutationStatus>, ParentType, Context>
}

export type MutationResolvers<Context = any, ParentType = Mutation> = {
  createUser?: Resolver<
    Maybe<CreateUserResponse>,
    ParentType,
    Context,
    MutationCreateUserArgs
  >
  logout?: Resolver<Maybe<LogoutResponse>, ParentType, Context>
  createOrganization?: Resolver<
    Maybe<CreateOrganizationResponse>,
    ParentType,
    Context,
    MutationCreateOrganizationArgs
  >
}

export type MutationErrorResolvers<
  Context = any,
  ParentType = MutationError
> = {
  field?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
  message?: Resolver<Scalars['String'], ParentType, Context>
}

export type MutationStatusResolvers<
  Context = any,
  ParentType = MutationStatus
> = {
  success?: Resolver<Scalars['Boolean'], ParentType, Context>
  errors?: Resolver<Maybe<ArrayOrIterable<MutationError>>, ParentType, Context>
}

export type OrganizationResolvers<Context = any, ParentType = Organization> = {
  id?: Resolver<Scalars['Int'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  figmaTeamId?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
}

export type QueryResolvers<Context = any, ParentType = Query> = {
  hello?: Resolver<Scalars['String'], ParentType, Context>
  config?: Resolver<Config, ParentType, Context>
  githubChecks?: Resolver<
    ArrayOrIterable<Maybe<GithubCheck>>,
    ParentType,
    Context,
    QueryGithubChecksArgs
  >
  githubCheck?: Resolver<
    Maybe<GithubCheck>,
    ParentType,
    Context,
    QueryGithubCheckArgs
  >
  currentUser?: Resolver<Maybe<User>, ParentType, Context>
  organizations?: Resolver<ArrayOrIterable<Organization>, ParentType, Context>
  organization?: Resolver<
    Maybe<Organization>,
    ParentType,
    Context,
    QueryOrganizationArgs
  >
}

export type UserResolvers<Context = any, ParentType = User> = {
  id?: Resolver<Scalars['Int'], ParentType, Context>
  name?: Resolver<Scalars['String'], ParentType, Context>
  figmaConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
  githubConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
}

export type IResolvers<Context = any> = {
  Config?: ConfigResolvers<Context>
  CreateOrganizationResponse?: CreateOrganizationResponseResolvers<Context>
  CreateUserResponse?: CreateUserResponseResolvers<Context>
  GithubCheck?: GithubCheckResolvers<Context>
  LogoutResponse?: LogoutResponseResolvers<Context>
  Mutation?: MutationResolvers<Context>
  MutationError?: MutationErrorResolvers<Context>
  MutationStatus?: MutationStatusResolvers<Context>
  Organization?: OrganizationResolvers<Context>
  Query?: QueryResolvers<Context>
  User?: UserResolvers<Context>
}

export type IDirectiveResolvers<Context = any> = {}

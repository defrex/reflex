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
}

export type CreateUserInput = {
  name: Scalars['String']
  email: Scalars['String']
}

export type GithubCheck = {
  id?: Maybe<Scalars['Int']>
  repoOwner: Scalars['String']
  repoName: Scalars['String']
  commitSha: Scalars['String']
  githubCheckId?: Maybe<Scalars['Int']>
}

export type Mutation = {
  createUser?: Maybe<User>
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type Organization = {
  name: Scalars['String']
  figmaTeamId?: Maybe<Scalars['String']>
}

export type Query = {
  hello: Scalars['String']
  currentUser?: Maybe<User>
  githubChecks: Array<Maybe<GithubCheck>>
  githubCheck?: Maybe<GithubCheck>
  organizations: Array<Maybe<Organization>>
  organization?: Maybe<Organization>
  config: Config
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
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
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
}

export type GithubCheckResolvers<Context = any, ParentType = GithubCheck> = {
  id?: Resolver<Maybe<Scalars['Int']>, ParentType, Context>
  repoOwner?: Resolver<Scalars['String'], ParentType, Context>
  repoName?: Resolver<Scalars['String'], ParentType, Context>
  commitSha?: Resolver<Scalars['String'], ParentType, Context>
  githubCheckId?: Resolver<Maybe<Scalars['Int']>, ParentType, Context>
}

export type MutationResolvers<Context = any, ParentType = Mutation> = {
  createUser?: Resolver<
    Maybe<User>,
    ParentType,
    Context,
    MutationCreateUserArgs
  >
}

export type OrganizationResolvers<Context = any, ParentType = Organization> = {
  name?: Resolver<Scalars['String'], ParentType, Context>
  figmaTeamId?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
}

export type QueryResolvers<Context = any, ParentType = Query> = {
  hello?: Resolver<Scalars['String'], ParentType, Context>
  currentUser?: Resolver<Maybe<User>, ParentType, Context>
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
  organizations?: Resolver<
    ArrayOrIterable<Maybe<Organization>>,
    ParentType,
    Context
  >
  organization?: Resolver<
    Maybe<Organization>,
    ParentType,
    Context,
    QueryOrganizationArgs
  >
  config?: Resolver<Config, ParentType, Context>
}

export type UserResolvers<Context = any, ParentType = User> = {
  id?: Resolver<Maybe<Scalars['Int']>, ParentType, Context>
  name?: Resolver<Maybe<Scalars['String']>, ParentType, Context>
  figmaConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
  githubConnected?: Resolver<Scalars['Boolean'], ParentType, Context>
}

export type IResolvers<Context = any> = {
  Config?: ConfigResolvers<Context>
  GithubCheck?: GithubCheckResolvers<Context>
  Mutation?: MutationResolvers<Context>
  Organization?: OrganizationResolvers<Context>
  Query?: QueryResolvers<Context>
  User?: UserResolvers<Context>
}

export type IDirectiveResolvers<Context = any> = {}

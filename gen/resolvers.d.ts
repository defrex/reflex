export type Maybe<T> = T | null

export interface CreateUserInput {
  name: string

  email: string
}
import { GraphQLResolveInfo } from 'graphql'

import { Context } from 'api/context'

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<Types>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export namespace QueryResolvers {
  export interface Resolvers<TContext = Context, TypeParent = {}> {
    hello?: HelloResolver<string, TypeParent, TContext>

    githubChecks?: GithubChecksResolver<
      (Maybe<GithubCheck>)[],
      TypeParent,
      TContext
    >

    githubCheck?: GithubCheckResolver<Maybe<GithubCheck>, TypeParent, TContext>

    currentUser?: CurrentUserResolver<Maybe<User>, TypeParent, TContext>
  }

  export type HelloResolver<
    R = string,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>
  export type GithubChecksResolver<
    R = (Maybe<GithubCheck>)[],
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, GithubChecksArgs>
  export interface GithubChecksArgs {
    repoOwner: string

    repoName?: Maybe<string>
  }

  export type GithubCheckResolver<
    R = Maybe<GithubCheck>,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, GithubCheckArgs>
  export interface GithubCheckArgs {
    repoOwner: string

    repoName: string

    commitSha: string
  }

  export type CurrentUserResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext>
}

export namespace GithubCheckResolvers {
  export interface Resolvers<TContext = Context, TypeParent = GithubCheck> {
    id?: IdResolver<string, TypeParent, TContext>

    repoOwner?: RepoOwnerResolver<string, TypeParent, TContext>

    repoName?: RepoNameResolver<string, TypeParent, TContext>

    commitSha?: CommitShaResolver<string, TypeParent, TContext>

    githubCheckId?: GithubCheckIdResolver<Maybe<number>, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = GithubCheck,
    TContext = Context
  > = Resolver<R, Parent, TContext>
  export type RepoOwnerResolver<
    R = string,
    Parent = GithubCheck,
    TContext = Context
  > = Resolver<R, Parent, TContext>
  export type RepoNameResolver<
    R = string,
    Parent = GithubCheck,
    TContext = Context
  > = Resolver<R, Parent, TContext>
  export type CommitShaResolver<
    R = string,
    Parent = GithubCheck,
    TContext = Context
  > = Resolver<R, Parent, TContext>
  export type GithubCheckIdResolver<
    R = Maybe<number>,
    Parent = GithubCheck,
    TContext = Context
  > = Resolver<R, Parent, TContext>
}

export namespace UserResolvers {
  export interface Resolvers<TContext = Context, TypeParent = User> {
    id?: IdResolver<string, TypeParent, TContext>

    name?: NameResolver<Maybe<string>, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = User,
    TContext = Context
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = Context
  > = Resolver<R, Parent, TContext>
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = Context, TypeParent = {}> {
    createUser?: CreateUserResolver<Maybe<User>, TypeParent, TContext>
  }

  export type CreateUserResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = Context
  > = Resolver<R, Parent, TContext, CreateUserArgs>
  export interface CreateUserArgs {
    input: CreateUserInput
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  Context
>
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  Context
>
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  Context
>
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string
}

export type IResolvers<TContext = Context> = {
  Query?: QueryResolvers.Resolvers<TContext>
  GithubCheck?: GithubCheckResolvers.Resolvers<TContext>
  User?: UserResolvers.Resolvers<TContext>
  Mutation?: MutationResolvers.Resolvers<TContext>
} & { [typeName: string]: never }

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>
  include?: IncludeDirectiveResolver<Result>
  deprecated?: DeprecatedDirectiveResolver<Result>
} & { [directiveName: string]: never }

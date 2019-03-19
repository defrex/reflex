type Maybe<T> = T | null
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Config = {
  loginUrl: Scalars['String']
  signupUrl: Scalars['String']
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

export type Query = {
  hello: Scalars['String']
  githubChecks: Array<Maybe<GithubCheck>>
  githubCheck?: Maybe<GithubCheck>
  currentUser?: Maybe<User>
  config?: Maybe<Config>
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

export type User = {
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}
export type CheckPageQueryQueryVariables = {
  repoOwner: Scalars['String']
  repoName: Scalars['String']
  commitSha: Scalars['String']
}

export type CheckPageQueryQuery = { __typename?: 'Query' } & {
  githubCheck: Maybe<
    { __typename?: 'GithubCheck' } & Pick<
      GithubCheck,
      'id' | 'repoOwner' | 'repoName' | 'commitSha' | 'githubCheckId'
    >
  >
}

export type ChecksPageQueryQueryVariables = {
  repoOwner: Scalars['String']
  repoName: Scalars['String']
}

export type ChecksPageQueryQuery = { __typename?: 'Query' } & {
  githubChecks: Array<
    Maybe<
      { __typename?: 'GithubCheck' } & Pick<
        GithubCheck,
        'id' | 'repoOwner' | 'repoName' | 'commitSha'
      >
    >
  >
} & PageQueryFragment

export type IndexQueryQueryVariables = {}

export type IndexQueryQuery = { __typename?: 'Query' } & Pick<Query, 'hello'>

export type AppBarQueryFragment = { __typename?: 'Query' } & {
  currentUser: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>
  config: Maybe<{ __typename?: 'Config' } & Pick<Config, 'loginUrl'>>
}

export type PageQueryFragment = { __typename?: 'Query' } & AppBarQueryFragment

export type TemplateQueryFragment = { __typename?: 'Query' } & Pick<
  Query,
  'hello'
>

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'
export const AppBarQueryFragmentDoc = gql`
  fragment AppBarQuery on Query {
    currentUser {
      id
      name
    }
    config {
      loginUrl
    }
  }
`
export const PageQueryFragmentDoc = gql`
  fragment PageQuery on Query {
    ...AppBarQuery
  }
  ${AppBarQueryFragmentDoc}
`
export const TemplateQueryFragmentDoc = gql`
  fragment TemplateQuery on Query {
    hello
  }
`
export const CheckPageQueryDocument = gql`
  query CheckPageQuery(
    $repoOwner: String!
    $repoName: String!
    $commitSha: String!
  ) {
    githubCheck(
      repoOwner: $repoOwner
      repoName: $repoName
      commitSha: $commitSha
    ) {
      id
      repoOwner
      repoName
      commitSha
      githubCheckId
    }
  }
`

export class CheckPageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<CheckPageQueryQuery, CheckPageQueryQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<CheckPageQueryQuery, CheckPageQueryQueryVariables>
        query={CheckPageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CheckPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CheckPageQueryQuery, CheckPageQueryQueryVariables>
> &
  TChildProps
export function withCheckPageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CheckPageQueryQuery,
        CheckPageQueryQueryVariables,
        CheckPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    CheckPageQueryQuery,
    CheckPageQueryQueryVariables,
    CheckPageQueryProps<TChildProps>
  >(CheckPageQueryDocument, operationOptions)
}
export const ChecksPageQueryDocument = gql`
  query ChecksPageQuery($repoOwner: String!, $repoName: String!) {
    githubChecks(repoOwner: $repoOwner, repoName: $repoName) {
      id
      repoOwner
      repoName
      commitSha
    }
    ...PageQuery
  }
  ${PageQueryFragmentDoc}
`

export class ChecksPageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<ChecksPageQueryQuery, ChecksPageQueryQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<ChecksPageQueryQuery, ChecksPageQueryQueryVariables>
        query={ChecksPageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ChecksPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ChecksPageQueryQuery, ChecksPageQueryQueryVariables>
> &
  TChildProps
export function withChecksPageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ChecksPageQueryQuery,
        ChecksPageQueryQueryVariables,
        ChecksPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    ChecksPageQueryQuery,
    ChecksPageQueryQueryVariables,
    ChecksPageQueryProps<TChildProps>
  >(ChecksPageQueryDocument, operationOptions)
}
export const IndexQueryDocument = gql`
  query IndexQuery {
    hello
  }
`

export class IndexQueryComponent extends React.Component<
  Partial<ReactApollo.QueryProps<IndexQueryQuery, IndexQueryQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<IndexQueryQuery, IndexQueryQueryVariables>
        query={IndexQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type IndexQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IndexQueryQuery, IndexQueryQueryVariables>
> &
  TChildProps
export function withIndexQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        IndexQueryQuery,
        IndexQueryQueryVariables,
        IndexQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    IndexQueryQuery,
    IndexQueryQueryVariables,
    IndexQueryProps<TChildProps>
  >(IndexQueryDocument, operationOptions)
}

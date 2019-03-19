export type Maybe<T> = T | null

export interface CreateUserInput {
  name: string

  email: string
}

// ====================================================
// Documents
// ====================================================

export type CheckPageQueryQueryVariables = {
  repoOwner: string
  repoName: string
  commitSha: string
}

export type CheckPageQueryQuery = {
  __typename?: 'Query'

  githubCheck: Maybe<CheckPageQueryGithubCheck>
}

export type CheckPageQueryGithubCheck = {
  __typename?: 'GithubCheck'

  id: Maybe<number>

  repoOwner: string

  repoName: string

  commitSha: string

  githubCheckId: Maybe<number>
}

export type ChecksPageQueryQueryVariables = {
  repoOwner: string
  repoName: string
}

export type ChecksPageQueryQuery = {
  __typename?: 'Query'

  githubChecks: (Maybe<ChecksPageQueryGithubChecks>)[]
} & PageQueryFragment

export type ChecksPageQueryGithubChecks = {
  __typename?: 'GithubCheck'

  id: Maybe<number>

  repoOwner: string

  repoName: string

  commitSha: string
}

export type IndexQueryQueryVariables = {}

export type IndexQueryQuery = {
  __typename?: 'Query'

  hello: string
}

export type AppBarQueryFragment = {
  __typename?: 'Query'

  currentUser: Maybe<AppBarQueryCurrentUser>

  config: {
    loginUrl: string
  }
}

export type AppBarQueryCurrentUser = {
  __typename?: 'User'

  id: Maybe<number>
  name: Maybe<string>
}

export type PageQueryFragment = AppBarQueryFragment

export type TemplateQueryFragment = {
  __typename?: 'Query'

  hello: string
}

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
export type CheckPageQueryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CheckPageQueryQuery, CheckPageQueryQueryVariables>
> &
  TChildProps
export function CheckPageQueryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CheckPageQueryQuery,
        CheckPageQueryQueryVariables,
        CheckPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
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
export type ChecksPageQueryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ChecksPageQueryQuery, ChecksPageQueryQueryVariables>
> &
  TChildProps
export function ChecksPageQueryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ChecksPageQueryQuery,
        ChecksPageQueryQueryVariables,
        ChecksPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
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
export type IndexQueryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<IndexQueryQuery, IndexQueryQueryVariables>
> &
  TChildProps
export function IndexQueryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        IndexQueryQuery,
        IndexQueryQueryVariables,
        IndexQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    IndexQueryQuery,
    IndexQueryQueryVariables,
    IndexQueryProps<TChildProps>
  >(IndexQueryDocument, operationOptions)
}

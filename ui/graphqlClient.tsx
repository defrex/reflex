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

export type Query = {
  hello: Scalars['String']
  githubChecks: Array<Maybe<GithubCheck>>
  githubCheck?: Maybe<GithubCheck>
  currentUser?: Maybe<User>
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

export type User = {
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  figmaConnected: Scalars['Boolean']
  githubConnected: Scalars['Boolean']
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
} & PageQueryFragment

export type DashboardQueryQueryVariables = {}

export type DashboardQueryQuery = { __typename?: 'Query' } & {
  currentUser: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      'name' | 'figmaConnected' | 'githubConnected'
    >
  >
} & (PageQueryFragment &
    FigmaAuthButtonQueryFragment &
    GithubAuthButtonQueryFragment)

export type IndexQueryQueryVariables = {}

export type IndexQueryQuery = { __typename?: 'Query' } & Pick<Query, 'hello'>

export type ProfilePageQueryQueryVariables = {}

export type ProfilePageQueryQuery = { __typename?: 'Query' } & {
  currentUser: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      'name' | 'figmaConnected' | 'githubConnected'
    >
  >
} & (PageQueryFragment &
    FigmaAuthButtonQueryFragment &
    GithubAuthButtonQueryFragment)

export type ProjectPageQueryQueryVariables = {
  repoOwner: Scalars['String']
  repoName: Scalars['String']
}

export type ProjectPageQueryQuery = { __typename?: 'Query' } & {
  githubChecks: Array<
    Maybe<
      { __typename?: 'GithubCheck' } & Pick<
        GithubCheck,
        'id' | 'repoOwner' | 'repoName' | 'commitSha'
      >
    >
  >
} & PageQueryFragment

export type AppBarQueryFragment = { __typename?: 'Query' } & {
  currentUser: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>
  config: { __typename?: 'Config' } & Pick<
    Config,
    'githubAuthUrl' | 'figmaAuthUrl'
  >
}

export type FigmaAuthButtonQueryFragment = { __typename?: 'Query' } & {
  config: { __typename?: 'Config' } & Pick<Config, 'figmaAuthUrl'>
  currentUser: Maybe<{ __typename?: 'User' } & Pick<User, 'figmaConnected'>>
}

export type GithubAuthButtonQueryFragment = { __typename?: 'Query' } & {
  config: { __typename?: 'Config' } & Pick<Config, 'githubAuthUrl'>
  currentUser: Maybe<{ __typename?: 'User' } & Pick<User, 'githubConnected'>>
}

export type PageQueryFragment = { __typename?: 'Query' } & AppBarQueryFragment

export type TemplateQueryFragment = { __typename?: 'Query' } & Pick<
  Query,
  'hello'
>

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'
export const FigmaAuthButtonQueryFragmentDoc = gql`
  fragment FigmaAuthButtonQuery on Query {
    config {
      figmaAuthUrl
    }
    currentUser {
      figmaConnected
    }
  }
`
export const GithubAuthButtonQueryFragmentDoc = gql`
  fragment GithubAuthButtonQuery on Query {
    config {
      githubAuthUrl
    }
    currentUser {
      githubConnected
    }
  }
`
export const AppBarQueryFragmentDoc = gql`
  fragment AppBarQuery on Query {
    currentUser {
      id
      name
    }
    config {
      githubAuthUrl
      figmaAuthUrl
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
    ...PageQuery
  }
  ${PageQueryFragmentDoc}
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
export const DashboardQueryDocument = gql`
  query DashboardQuery {
    currentUser {
      name
      figmaConnected
      githubConnected
    }
    ...PageQuery
    ...FigmaAuthButtonQuery
    ...GithubAuthButtonQuery
  }
  ${PageQueryFragmentDoc}
  ${FigmaAuthButtonQueryFragmentDoc}
  ${GithubAuthButtonQueryFragmentDoc}
`

export class DashboardQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<DashboardQueryQuery, DashboardQueryQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<DashboardQueryQuery, DashboardQueryQueryVariables>
        query={DashboardQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type DashboardQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<DashboardQueryQuery, DashboardQueryQueryVariables>
> &
  TChildProps
export function withDashboardQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DashboardQueryQuery,
        DashboardQueryQueryVariables,
        DashboardQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    DashboardQueryQuery,
    DashboardQueryQueryVariables,
    DashboardQueryProps<TChildProps>
  >(DashboardQueryDocument, operationOptions)
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
export const ProfilePageQueryDocument = gql`
  query ProfilePageQuery {
    currentUser {
      name
      figmaConnected
      githubConnected
    }
    ...PageQuery
    ...FigmaAuthButtonQuery
    ...GithubAuthButtonQuery
  }
  ${PageQueryFragmentDoc}
  ${FigmaAuthButtonQueryFragmentDoc}
  ${GithubAuthButtonQueryFragmentDoc}
`

export class ProfilePageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      ProfilePageQueryQuery,
      ProfilePageQueryQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<ProfilePageQueryQuery, ProfilePageQueryQueryVariables>
        query={ProfilePageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ProfilePageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ProfilePageQueryQuery, ProfilePageQueryQueryVariables>
> &
  TChildProps
export function withProfilePageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ProfilePageQueryQuery,
        ProfilePageQueryQueryVariables,
        ProfilePageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    ProfilePageQueryQuery,
    ProfilePageQueryQueryVariables,
    ProfilePageQueryProps<TChildProps>
  >(ProfilePageQueryDocument, operationOptions)
}
export const ProjectPageQueryDocument = gql`
  query ProjectPageQuery($repoOwner: String!, $repoName: String!) {
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

export class ProjectPageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      ProjectPageQueryQuery,
      ProjectPageQueryQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<ProjectPageQueryQuery, ProjectPageQueryQueryVariables>
        query={ProjectPageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ProjectPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ProjectPageQueryQuery, ProjectPageQueryQueryVariables>
> &
  TChildProps
export function withProjectPageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ProjectPageQueryQuery,
        ProjectPageQueryQueryVariables,
        ProjectPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    ProjectPageQueryQuery,
    ProjectPageQueryQueryVariables,
    ProjectPageQueryProps<TChildProps>
  >(ProjectPageQueryDocument, operationOptions)
}

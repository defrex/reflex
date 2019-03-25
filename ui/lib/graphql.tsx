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

export type CreateOrganizationPageMutationMutationVariables = {
  name: Scalars['String']
}

export type CreateOrganizationPageMutationMutation = {
  __typename?: 'Mutation'
} & {
  createOrganization: Maybe<
    { __typename?: 'CreateOrganizationResponse' } & {
      status: { __typename?: 'MutationStatus' } & Pick<
        MutationStatus,
        'success'
      >
      organization: Maybe<
        { __typename?: 'Organization' } & Pick<Organization, 'id'>
      >
    }
  >
}

export type OrganizationsPageQueryQueryVariables = {}

export type OrganizationsPageQueryQuery = { __typename?: 'Query' } & {
  organizations: Array<
    { __typename?: 'Organization' } & Pick<Organization, 'id' | 'name'>
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

export type OrganizationPageQueryQueryVariables = {
  organizationId: Scalars['Int']
}

export type OrganizationPageQueryQuery = { __typename?: 'Query' } & {
  organization: Maybe<
    { __typename?: 'Organization' } & Pick<Organization, 'name'>
  >
} & PageQueryFragment

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

export type MainMenuQueryFragment = { __typename?: 'Query' } & {
  currentUser: Maybe<{ __typename?: 'User' } & Pick<User, 'name'>>
  organizations: Array<
    { __typename?: 'Organization' } & Pick<Organization, 'id' | 'name'>
  >
  config: { __typename?: 'Config' } & Pick<Config, 'logoutUrl'>
} & GithubAuthButtonQueryFragment

export type MainMenuMutationMutationVariables = {}

export type MainMenuMutationMutation = { __typename?: 'Mutation' } & {
  logout: Maybe<
    { __typename?: 'LogoutResponse' } & {
      status: Maybe<
        { __typename?: 'MutationStatus' } & Pick<MutationStatus, 'success'>
      >
    }
  >
}

export type PageQueryFragment = {
  __typename?: 'Query'
} & (AppBarQueryFragment & MainMenuQueryFragment)

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
export const MainMenuQueryFragmentDoc = gql`
  fragment MainMenuQuery on Query {
    currentUser {
      name
    }
    organizations {
      id
      name
    }
    config {
      logoutUrl
    }
    ...GithubAuthButtonQuery
  }
  ${GithubAuthButtonQueryFragmentDoc}
`
export const PageQueryFragmentDoc = gql`
  fragment PageQuery on Query {
    ...AppBarQuery
    ...MainMenuQuery
  }
  ${AppBarQueryFragmentDoc}
  ${MainMenuQueryFragmentDoc}
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
export const CreateOrganizationPageMutationDocument = gql`
  mutation CreateOrganizationPageMutation($name: String!) {
    createOrganization(input: { name: $name }) {
      status {
        success
      }
      organization {
        id
      }
    }
  }
`

export class CreateOrganizationPageMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateOrganizationPageMutationMutation,
      CreateOrganizationPageMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateOrganizationPageMutationMutation,
        CreateOrganizationPageMutationMutationVariables
      >
        mutation={CreateOrganizationPageMutationDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateOrganizationPageMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateOrganizationPageMutationMutation,
    CreateOrganizationPageMutationMutationVariables
  >
> &
  TChildProps
export type CreateOrganizationPageMutationMutationFn = ReactApollo.MutationFn<
  CreateOrganizationPageMutationMutation,
  CreateOrganizationPageMutationMutationVariables
>
export function withCreateOrganizationPageMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateOrganizationPageMutationMutation,
        CreateOrganizationPageMutationMutationVariables,
        CreateOrganizationPageMutationProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withMutation<
    TProps,
    CreateOrganizationPageMutationMutation,
    CreateOrganizationPageMutationMutationVariables,
    CreateOrganizationPageMutationProps<TChildProps>
  >(CreateOrganizationPageMutationDocument, operationOptions)
}
export const OrganizationsPageQueryDocument = gql`
  query OrganizationsPageQuery {
    organizations {
      id
      name
    }
    ...PageQuery
  }
  ${PageQueryFragmentDoc}
`

export class OrganizationsPageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      OrganizationsPageQueryQuery,
      OrganizationsPageQueryQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        OrganizationsPageQueryQuery,
        OrganizationsPageQueryQueryVariables
      >
        query={OrganizationsPageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type OrganizationsPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    OrganizationsPageQueryQuery,
    OrganizationsPageQueryQueryVariables
  >
> &
  TChildProps
export function withOrganizationsPageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        OrganizationsPageQueryQuery,
        OrganizationsPageQueryQueryVariables,
        OrganizationsPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    OrganizationsPageQueryQuery,
    OrganizationsPageQueryQueryVariables,
    OrganizationsPageQueryProps<TChildProps>
  >(OrganizationsPageQueryDocument, operationOptions)
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
export const OrganizationPageQueryDocument = gql`
  query OrganizationPageQuery($organizationId: Int!) {
    organization(id: $organizationId) {
      name
    }
    ...PageQuery
  }
  ${PageQueryFragmentDoc}
`

export class OrganizationPageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      OrganizationPageQueryQuery,
      OrganizationPageQueryQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        OrganizationPageQueryQuery,
        OrganizationPageQueryQueryVariables
      >
        query={OrganizationPageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type OrganizationPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    OrganizationPageQueryQuery,
    OrganizationPageQueryQueryVariables
  >
> &
  TChildProps
export function withOrganizationPageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        OrganizationPageQueryQuery,
        OrganizationPageQueryQueryVariables,
        OrganizationPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    OrganizationPageQueryQuery,
    OrganizationPageQueryQueryVariables,
    OrganizationPageQueryProps<TChildProps>
  >(OrganizationPageQueryDocument, operationOptions)
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
export const MainMenuMutationDocument = gql`
  mutation MainMenuMutation {
    logout {
      status {
        success
      }
    }
  }
`

export class MainMenuMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      MainMenuMutationMutation,
      MainMenuMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        MainMenuMutationMutation,
        MainMenuMutationMutationVariables
      >
        mutation={MainMenuMutationDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type MainMenuMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    MainMenuMutationMutation,
    MainMenuMutationMutationVariables
  >
> &
  TChildProps
export type MainMenuMutationMutationFn = ReactApollo.MutationFn<
  MainMenuMutationMutation,
  MainMenuMutationMutationVariables
>
export function withMainMenuMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MainMenuMutationMutation,
        MainMenuMutationMutationVariables,
        MainMenuMutationProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withMutation<
    TProps,
    MainMenuMutationMutation,
    MainMenuMutationMutationVariables,
    MainMenuMutationProps<TChildProps>
  >(MainMenuMutationDocument, operationOptions)
}

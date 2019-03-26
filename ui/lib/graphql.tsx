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
export type CheckPageQueryQueryVariables = {
  repoOwner: Scalars['String']
  repoName: Scalars['String']
  commitSha: Scalars['String']
}

export type CheckPageQueryQuery = { __typename?: 'Query' } & PageQueryFragment

export type CreateTeamPageMutationMutationVariables = {
  name: Scalars['String']
}

export type CreateTeamPageMutationMutation = { __typename?: 'Mutation' } & {
  createTeam: Maybe<
    { __typename?: 'CreateTeamResponse' } & {
      status: { __typename?: 'MutationStatus' } & Pick<
        MutationStatus,
        'success'
      >
      team: Maybe<{ __typename?: 'Team' } & Pick<Team, 'id'>>
    }
  >
}

export type TeamsPageQueryQueryVariables = {}

export type TeamsPageQueryQuery = { __typename?: 'Query' } & {
  teams: Array<{ __typename?: 'Team' } & Pick<Team, 'id' | 'name'>>
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

export type ProjectPageQueryQuery = { __typename?: 'Query' } & PageQueryFragment

export type TeamPageQueryQueryVariables = {
  teamId: Scalars['ID']
}

export type TeamPageQueryQuery = { __typename?: 'Query' } & {
  team: Maybe<{ __typename?: 'Team' } & Pick<Team, 'name'>>
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
  teams: Array<{ __typename?: 'Team' } & Pick<Team, 'id' | 'name'>>
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
    teams {
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
export const CreateTeamPageMutationDocument = gql`
  mutation CreateTeamPageMutation($name: String!) {
    createTeam(input: { name: $name }) {
      status {
        success
      }
      team {
        id
      }
    }
  }
`

export class CreateTeamPageMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateTeamPageMutationMutation,
      CreateTeamPageMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateTeamPageMutationMutation,
        CreateTeamPageMutationMutationVariables
      >
        mutation={CreateTeamPageMutationDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateTeamPageMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateTeamPageMutationMutation,
    CreateTeamPageMutationMutationVariables
  >
> &
  TChildProps
export type CreateTeamPageMutationMutationFn = ReactApollo.MutationFn<
  CreateTeamPageMutationMutation,
  CreateTeamPageMutationMutationVariables
>
export function withCreateTeamPageMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateTeamPageMutationMutation,
        CreateTeamPageMutationMutationVariables,
        CreateTeamPageMutationProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withMutation<
    TProps,
    CreateTeamPageMutationMutation,
    CreateTeamPageMutationMutationVariables,
    CreateTeamPageMutationProps<TChildProps>
  >(CreateTeamPageMutationDocument, operationOptions)
}
export const TeamsPageQueryDocument = gql`
  query TeamsPageQuery {
    teams {
      id
      name
    }
    ...PageQuery
  }
  ${PageQueryFragmentDoc}
`

export class TeamsPageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<TeamsPageQueryQuery, TeamsPageQueryQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<TeamsPageQueryQuery, TeamsPageQueryQueryVariables>
        query={TeamsPageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type TeamsPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<TeamsPageQueryQuery, TeamsPageQueryQueryVariables>
> &
  TChildProps
export function withTeamsPageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TeamsPageQueryQuery,
        TeamsPageQueryQueryVariables,
        TeamsPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    TeamsPageQueryQuery,
    TeamsPageQueryQueryVariables,
    TeamsPageQueryProps<TChildProps>
  >(TeamsPageQueryDocument, operationOptions)
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
export const TeamPageQueryDocument = gql`
  query TeamPageQuery($teamId: ID!) {
    team(id: $teamId) {
      name
    }
    ...PageQuery
  }
  ${PageQueryFragmentDoc}
`

export class TeamPageQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<TeamPageQueryQuery, TeamPageQueryQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<TeamPageQueryQuery, TeamPageQueryQueryVariables>
        query={TeamPageQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type TeamPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<TeamPageQueryQuery, TeamPageQueryQueryVariables>
> &
  TChildProps
export function withTeamPageQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        TeamPageQueryQuery,
        TeamPageQueryQueryVariables,
        TeamPageQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    TeamPageQueryQuery,
    TeamPageQueryQueryVariables,
    TeamPageQueryProps<TChildProps>
  >(TeamPageQueryDocument, operationOptions)
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

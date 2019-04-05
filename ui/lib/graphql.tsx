type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Component = {
  id: Scalars['ID']
  name: Scalars['String']
  team: Team
  examples: Array<Example>
}

export type Config = {
  figmaAuthUrl: Scalars['String']
  githubAuthUrl: Scalars['String']
  logoutUrl: Scalars['String']
}

export type CreateComponentInput = {
  teamId: Scalars['ID']
  name: Scalars['String']
}

export type CreateComponentResponse = {
  component?: Maybe<Component>
  status: MutationStatus
}

export type CreateExampleInput = {
  componentId: Scalars['ID']
  name: Scalars['String']
}

export type CreateExampleResponse = {
  example?: Maybe<Example>
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

export type Example = {
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
  component: Component
  renders: Array<Maybe<Render>>
}

export type LogoutResponse = {
  status?: Maybe<MutationStatus>
}

export type Mutation = {
  logout?: Maybe<LogoutResponse>
  createTeam?: Maybe<CreateTeamResponse>
  createComponent?: Maybe<CreateComponentResponse>
  createExample?: Maybe<CreateExampleResponse>
  renderExample?: Maybe<RenderExampleResponse>
}

export type MutationCreateTeamArgs = {
  input: CreateTeamInput
}

export type MutationCreateComponentArgs = {
  input: CreateComponentInput
}

export type MutationCreateExampleArgs = {
  input: CreateExampleInput
}

export type MutationRenderExampleArgs = {
  input: RenderExampleInput
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

export type Render = {
  id: Scalars['ID']
  imageUrl: Scalars['String']
  example: Example
}

export type RenderExampleInput = {
  exampleId: Scalars['ID']
}

export type RenderExampleResponse = {
  render?: Maybe<Render>
  status: MutationStatus
}

export type Team = {
  id: Scalars['ID']
  name: Scalars['String']
  role: Scalars['String']
  components: Array<Component>
}

export type User = {
  id: Scalars['ID']
  name: Scalars['String']
  figmaConnected: Scalars['Boolean']
  githubConnected: Scalars['Boolean']
}
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

export type LibraryQueryQueryVariables = {}

export type LibraryQueryQuery = { __typename?: 'Query' } & PageQueryFragment

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
export const LibraryQueryDocument = gql`
  query LibraryQuery {
    ...PageQuery
  }
  ${PageQueryFragmentDoc}
`

export class LibraryQueryComponent extends React.Component<
  Partial<ReactApollo.QueryProps<LibraryQueryQuery, LibraryQueryQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<LibraryQueryQuery, LibraryQueryQueryVariables>
        query={LibraryQueryDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type LibraryQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LibraryQueryQuery, LibraryQueryQueryVariables>
> &
  TChildProps
export function withLibraryQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LibraryQueryQuery,
        LibraryQueryQueryVariables,
        LibraryQueryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.withQuery<
    TProps,
    LibraryQueryQuery,
    LibraryQueryQueryVariables,
    LibraryQueryProps<TChildProps>
  >(LibraryQueryDocument, operationOptions)
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

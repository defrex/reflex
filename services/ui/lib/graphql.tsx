export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Check = {
  id: Scalars['ID']
  githubCheckId?: Maybe<Scalars['Int']>
  branch: Scalars['String']
  commit: Scalars['String']
  repoTarball?: Maybe<Scalars['String']>
  repo: Repo
}

export type CliAuthSession = {
  url: Scalars['String']
  cliAuthToken: Scalars['String']
  userAuthToken?: Maybe<Scalars['String']>
}

export type Component = {
  id: Scalars['ID']
  name: Scalars['String']
  team: Team
  samples: Array<Sample>
}

export type Config = {
  figmaAuthUrl: Scalars['String']
  githubAuthUrl: Scalars['String']
}

export type CreateCliAuthSessionResponse = {
  cliAuthSession?: Maybe<CliAuthSession>
  status: MutationStatus
}

export type CreateComponentInput = {
  teamId: Scalars['ID']
  name: Scalars['String']
}

export type CreateComponentResponse = {
  component?: Maybe<Component>
  status: MutationStatus
}

export type CreateRenderInput = {
  componentName: Scalars['String']
  sampleName: Scalars['String']
  html: Scalars['String']
  imageUrl?: Maybe<Scalars['String']>
  branch: Scalars['String']
  commit: Scalars['String']
}

export type CreateRenderResponse = {
  render?: Maybe<Render>
  status: MutationStatus
}

export type CreateSampleInput = {
  componentId: Scalars['ID']
  name: Scalars['String']
}

export type CreateSampleResponse = {
  sample?: Maybe<Sample>
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

export type Mutation = {
  createCliAuthSession?: Maybe<CreateCliAuthSessionResponse>
  createTeam?: Maybe<CreateTeamResponse>
  createComponent?: Maybe<CreateComponentResponse>
  createSample?: Maybe<CreateSampleResponse>
  createRender?: Maybe<CreateRenderResponse>
}

export type MutationCreateTeamArgs = {
  input: CreateTeamInput
}

export type MutationCreateComponentArgs = {
  input: CreateComponentInput
}

export type MutationCreateSampleArgs = {
  input: CreateSampleInput
}

export type MutationCreateRenderArgs = {
  input: CreateRenderInput
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
  cliAuthSession?: Maybe<CliAuthSession>
  teams: Array<Team>
  team?: Maybe<Team>
  check?: Maybe<Check>
}

export type QueryCliAuthSessionArgs = {
  cliAuthToken: Scalars['String']
}

export type QueryTeamArgs = {
  id: Scalars['ID']
}

export type QueryCheckArgs = {
  id: Scalars['ID']
}

export type Render = {
  id: Scalars['ID']
  createdAt: Scalars['String']
  imageUrl?: Maybe<Scalars['String']>
  html: Scalars['String']
  branch: Scalars['String']
  commit: Scalars['String']
  sample: Sample
}

export type Repo = {
  id: Scalars['ID']
  owner: Scalars['String']
  name: Scalars['String']
  checks: Array<Maybe<Check>>
}

export type Sample = {
  id: Scalars['ID']
  name: Scalars['String']
  component: Component
  renders: Array<Render>
}

export type Team = {
  id: Scalars['ID']
  name: Scalars['String']
  role: Scalars['String']
  component?: Maybe<Component>
  components: Array<Component>
  repos: Array<Repo>
}

export type TeamComponentArgs = {
  id: Scalars['ID']
}

export type User = {
  id: Scalars['ID']
  name: Scalars['String']
  figmaConnected: Scalars['Boolean']
  githubConnected: Scalars['Boolean']
}
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
} & GithubAuthButtonQueryFragment

export type PageQueryFragment = { __typename?: 'Query' } & {
  currentUser: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
} & (AppBarQueryFragment & MainMenuQueryFragment)

export type TemplateQueryFragment = { __typename?: 'Query' } & Pick<
  Query,
  'hello'
>

export type ComponentQueryQueryVariables = {
  teamId: Scalars['ID']
  componentId: Scalars['ID']
}

export type ComponentQueryQuery = { __typename?: 'Query' } & {
  team: Maybe<
    { __typename?: 'Team' } & Pick<Team, 'name'> & {
        component: Maybe<
          { __typename?: 'Component' } & Pick<Component, 'id' | 'name'> & {
              samples: Array<
                { __typename?: 'Sample' } & Pick<Sample, 'id' | 'name'> & {
                    renders: Array<
                      { __typename?: 'Render' } & Pick<
                        Render,
                        'id' | 'createdAt' | 'branch' | 'commit' | 'html'
                      >
                    >
                  }
              >
            }
        >
      }
  >
} & PageQueryFragment

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

export type LibraryQueryQueryVariables = {
  teamId: Scalars['ID']
}

export type LibraryQueryQuery = { __typename?: 'Query' } & {
  team: Maybe<
    { __typename?: 'Team' } & Pick<Team, 'id' | 'name'> & {
        components: Array<
          { __typename?: 'Component' } & Pick<Component, 'id' | 'name'> & {
              samples: Array<
                { __typename?: 'Sample' } & Pick<Sample, 'id' | 'name'> & {
                    renders: Array<
                      { __typename?: 'Render' } & Pick<
                        Render,
                        'id' | 'createdAt' | 'branch' | 'commit' | 'html'
                      >
                    >
                  }
              >
            }
        >
      }
  >
} & PageQueryFragment

export type LoginQueryQueryVariables = {}

export type LoginQueryQuery = {
  __typename?: 'Query'
} & GithubAuthButtonQueryFragment

export type TeamPageQueryQueryVariables = {
  teamId: Scalars['ID']
}

export type TeamPageQueryQuery = { __typename?: 'Query' } & {
  team: Maybe<{ __typename?: 'Team' } & Pick<Team, 'name'>>
} & PageQueryFragment

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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
    ...GithubAuthButtonQuery
  }
  ${GithubAuthButtonQueryFragmentDoc}
`
export const PageQueryFragmentDoc = gql`
  fragment PageQuery on Query {
    currentUser {
      id
    }
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
export const ComponentQueryDocument = gql`
  query ComponentQuery($teamId: ID!, $componentId: ID!) {
    ...PageQuery
    team(id: $teamId) {
      name
      component(id: $componentId) {
        id
        name
        samples {
          id
          name
          renders {
            id
            createdAt
            branch
            commit
            html
          }
        }
      }
    }
  }
  ${PageQueryFragmentDoc}
`

export const ComponentQueryComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<ComponentQueryQuery, ComponentQueryQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables: ComponentQueryQueryVariables },
) => (
  <ReactApollo.Query<ComponentQueryQuery, ComponentQueryQueryVariables>
    query={ComponentQueryDocument}
    {...props}
  />
)

export type ComponentQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ComponentQueryQuery, ComponentQueryQueryVariables>
> &
  TChildProps
export function withComponentQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ComponentQueryQuery,
    ComponentQueryQueryVariables,
    ComponentQueryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    ComponentQueryQuery,
    ComponentQueryQueryVariables,
    ComponentQueryProps<TChildProps>
  >(ComponentQueryDocument, {
    alias: 'withComponentQuery',
    ...operationOptions,
  })
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
export type CreateTeamPageMutationMutationFn = ReactApollo.MutationFn<
  CreateTeamPageMutationMutation,
  CreateTeamPageMutationMutationVariables
>

export const CreateTeamPageMutationComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        CreateTeamPageMutationMutation,
        CreateTeamPageMutationMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: CreateTeamPageMutationMutationVariables },
) => (
  <ReactApollo.Mutation<
    CreateTeamPageMutationMutation,
    CreateTeamPageMutationMutationVariables
  >
    mutation={CreateTeamPageMutationDocument}
    {...props}
  />
)

export type CreateTeamPageMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    CreateTeamPageMutationMutation,
    CreateTeamPageMutationMutationVariables
  >
> &
  TChildProps
export function withCreateTeamPageMutation<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateTeamPageMutationMutation,
    CreateTeamPageMutationMutationVariables,
    CreateTeamPageMutationProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<
    TProps,
    CreateTeamPageMutationMutation,
    CreateTeamPageMutationMutationVariables,
    CreateTeamPageMutationProps<TChildProps>
  >(CreateTeamPageMutationDocument, {
    alias: 'withCreateTeamPageMutation',
    ...operationOptions,
  })
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

export const TeamsPageQueryComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<TeamsPageQueryQuery, TeamsPageQueryQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables?: TeamsPageQueryQueryVariables },
) => (
  <ReactApollo.Query<TeamsPageQueryQuery, TeamsPageQueryQueryVariables>
    query={TeamsPageQueryDocument}
    {...props}
  />
)

export type TeamsPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<TeamsPageQueryQuery, TeamsPageQueryQueryVariables>
> &
  TChildProps
export function withTeamsPageQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    TeamsPageQueryQuery,
    TeamsPageQueryQueryVariables,
    TeamsPageQueryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    TeamsPageQueryQuery,
    TeamsPageQueryQueryVariables,
    TeamsPageQueryProps<TChildProps>
  >(TeamsPageQueryDocument, {
    alias: 'withTeamsPageQuery',
    ...operationOptions,
  })
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

export const DashboardQueryComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<DashboardQueryQuery, DashboardQueryQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables?: DashboardQueryQueryVariables },
) => (
  <ReactApollo.Query<DashboardQueryQuery, DashboardQueryQueryVariables>
    query={DashboardQueryDocument}
    {...props}
  />
)

export type DashboardQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<DashboardQueryQuery, DashboardQueryQueryVariables>
> &
  TChildProps
export function withDashboardQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DashboardQueryQuery,
    DashboardQueryQueryVariables,
    DashboardQueryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    DashboardQueryQuery,
    DashboardQueryQueryVariables,
    DashboardQueryProps<TChildProps>
  >(DashboardQueryDocument, {
    alias: 'withDashboardQuery',
    ...operationOptions,
  })
}
export const IndexQueryDocument = gql`
  query IndexQuery {
    hello
  }
`

export const IndexQueryComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<IndexQueryQuery, IndexQueryQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables?: IndexQueryQueryVariables },
) => (
  <ReactApollo.Query<IndexQueryQuery, IndexQueryQueryVariables>
    query={IndexQueryDocument}
    {...props}
  />
)

export type IndexQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IndexQueryQuery, IndexQueryQueryVariables>
> &
  TChildProps
export function withIndexQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IndexQueryQuery,
    IndexQueryQueryVariables,
    IndexQueryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    IndexQueryQuery,
    IndexQueryQueryVariables,
    IndexQueryProps<TChildProps>
  >(IndexQueryDocument, {
    alias: 'withIndexQuery',
    ...operationOptions,
  })
}
export const LibraryQueryDocument = gql`
  query LibraryQuery($teamId: ID!) {
    ...PageQuery
    team(id: $teamId) {
      id
      name
      components {
        id
        name
        samples {
          id
          name
          renders {
            id
            createdAt
            branch
            commit
            html
          }
        }
      }
    }
  }
  ${PageQueryFragmentDoc}
`

export const LibraryQueryComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<LibraryQueryQuery, LibraryQueryQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables: LibraryQueryQueryVariables },
) => (
  <ReactApollo.Query<LibraryQueryQuery, LibraryQueryQueryVariables>
    query={LibraryQueryDocument}
    {...props}
  />
)

export type LibraryQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LibraryQueryQuery, LibraryQueryQueryVariables>
> &
  TChildProps
export function withLibraryQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LibraryQueryQuery,
    LibraryQueryQueryVariables,
    LibraryQueryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    LibraryQueryQuery,
    LibraryQueryQueryVariables,
    LibraryQueryProps<TChildProps>
  >(LibraryQueryDocument, {
    alias: 'withLibraryQuery',
    ...operationOptions,
  })
}
export const LoginQueryDocument = gql`
  query LoginQuery {
    ...GithubAuthButtonQuery
  }
  ${GithubAuthButtonQueryFragmentDoc}
`

export const LoginQueryComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<LoginQueryQuery, LoginQueryQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables?: LoginQueryQueryVariables },
) => (
  <ReactApollo.Query<LoginQueryQuery, LoginQueryQueryVariables>
    query={LoginQueryDocument}
    {...props}
  />
)

export type LoginQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LoginQueryQuery, LoginQueryQueryVariables>
> &
  TChildProps
export function withLoginQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginQueryQuery,
    LoginQueryQueryVariables,
    LoginQueryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    LoginQueryQuery,
    LoginQueryQueryVariables,
    LoginQueryProps<TChildProps>
  >(LoginQueryDocument, {
    alias: 'withLoginQuery',
    ...operationOptions,
  })
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

export const TeamPageQueryComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<TeamPageQueryQuery, TeamPageQueryQueryVariables>,
      'query'
    >,
    'variables'
  > & { variables: TeamPageQueryQueryVariables },
) => (
  <ReactApollo.Query<TeamPageQueryQuery, TeamPageQueryQueryVariables>
    query={TeamPageQueryDocument}
    {...props}
  />
)

export type TeamPageQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<TeamPageQueryQuery, TeamPageQueryQueryVariables>
> &
  TChildProps
export function withTeamPageQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    TeamPageQueryQuery,
    TeamPageQueryQueryVariables,
    TeamPageQueryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    TeamPageQueryQuery,
    TeamPageQueryQueryVariables,
    TeamPageQueryProps<TChildProps>
  >(TeamPageQueryDocument, {
    alias: 'withTeamPageQuery',
    ...operationOptions,
  })
}

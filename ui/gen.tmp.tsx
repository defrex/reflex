export type Maybe<T> = T | null

export interface CreateUserInput {
  name: string

  email: string
}

// ====================================================
// Documents
// ====================================================

export namespace CheckPageQuery {
  export type Variables = {
    repoOwner: string
    repoName: string
    commitSha: string
  }

  export type Query = {
    __typename?: 'Query'

    githubCheck: Maybe<GithubCheck>
  }

  export type GithubCheck = {
    __typename?: 'GithubCheck'

    id: Maybe<number>

    repoOwner: string

    repoName: string

    commitSha: string

    githubCheckId: Maybe<number>
  }
}

export namespace ChecksPageQuery {
  export type Variables = {
    repoOwner: string
    repoName: string
  }

  export type Query = {
    __typename?: 'Query'

    githubChecks: (Maybe<GithubChecks>)[]
  } & PageQuery.Fragment

  export type GithubChecks = {
    __typename?: 'GithubCheck'

    id: Maybe<number>

    repoOwner: string

    repoName: string

    commitSha: string
  }
}

export namespace IndexQuery {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    hello: string
  }
}

export namespace AppBarQuery {
  export type Fragment = {
    __typename?: 'Query'

    currentUser: Maybe<CurrentUser>

    config: Maybe<Config>
  }

  export type CurrentUser = {
    __typename?: 'User'

    id: Maybe<number>

    name: Maybe<string>
  }

  export type Config = {
    __typename?: 'Config'

    loginUrl: string
  }
}

export namespace PageQuery {
  export type Fragment = AppBarQuery.Fragment
}

export namespace TemplateQuery {
  export type Fragment = {
    __typename?: 'Query'

    hello: string
  }
}

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'

// ====================================================
// Fragments
// ====================================================

export namespace AppBarQuery {
  export const FragmentDoc = gql`
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
}

export namespace PageQuery {
  export const FragmentDoc = gql`
    fragment PageQuery on Query {
      ...AppBarQuery
    }

    ${AppBarQuery.FragmentDoc}
  `
}

export namespace TemplateQuery {
  export const FragmentDoc = gql`
    fragment TemplateQuery on Query {
      hello
    }
  `
}

// ====================================================
// Components
// ====================================================

export namespace CheckPageQuery {
  export const Document = gql`
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
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)['props'] as any}
        />
      )
    }
  }
}
export namespace ChecksPageQuery {
  export const Document = gql`
    query ChecksPageQuery($repoOwner: String!, $repoName: String!) {
      githubChecks(repoOwner: $repoOwner, repoName: $repoName) {
        id
        repoOwner
        repoName
        commitSha
      }
      ...PageQuery
    }

    ${PageQuery.FragmentDoc}
  `
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)['props'] as any}
        />
      )
    }
  }
}
export namespace IndexQuery {
  export const Document = gql`
    query IndexQuery {
      hello
    }
  `
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)['props'] as any}
        />
      )
    }
  }
}

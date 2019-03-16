export type Maybe<T> = T | null

export interface CreateUserInput {
  name: string

  email: string
}

// ====================================================
// Types
// ====================================================

export interface Query {
  hello: string

  githubChecks: (Maybe<GithubCheck>)[]

  githubCheck?: Maybe<GithubCheck>

  currentUser?: Maybe<User>
}

export interface GithubCheck {
  id: string

  repoOwner: string

  repoName: string

  commitSha: string

  githubCheckId?: Maybe<number>
}

export interface User {
  id: string

  name?: Maybe<string>
}

export interface Mutation {
  createUser?: Maybe<User>
}

// ====================================================
// Arguments
// ====================================================

export interface GithubChecksQueryArgs {
  repoOwner: string

  repoName?: Maybe<string>
}
export interface GithubCheckQueryArgs {
  repoOwner: string

  repoName: string

  commitSha: string
}
export interface CreateUserMutationArgs {
  input: CreateUserInput
}

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

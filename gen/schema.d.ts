export type Maybe<T> = T | null;

export interface CreateUserInput {
  name: string;

  email: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  hello: string;

  githubChecks: (Maybe<GithubCheck>)[];

  githubCheck?: Maybe<GithubCheck>;
}

export interface GithubCheck {
  id: string;

  repoOwner: string;

  repoName: string;

  commitSha: string;

  githubCheckId?: Maybe<number>;
}

export interface Mutation {
  createUser?: Maybe<User>;
}

export interface User {
  id: string;

  name?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface GithubCheckQueryArgs {
  repoOwner: string;

  repoName: string;

  commitSha: string;
}
export interface CreateUserMutationArgs {
  input: CreateUserInput;
}

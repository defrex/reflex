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
}

export interface GithubCheck {
  id: string;
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

export interface CreateUserMutationArgs {
  input: CreateUserInput;
}

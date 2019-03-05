export type Maybe<T> = T | null;

export interface CreateUserInput {
  name: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  hello: string;
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

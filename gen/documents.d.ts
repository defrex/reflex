export type Maybe<T> = T | null;

export interface CreateUserInput {
  name: string;

  email: string;
}

// ====================================================
// Documents
// ====================================================

export namespace IndexQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    hello: string;
  };
}

import { Client, ClientOptions } from 'graphql-typed-client'
import { QueryRequest, QueryPromiseChain, Query } from './schema'
export declare const createClient: (
  options: ClientOptions,
) => Client<QueryRequest, QueryPromiseChain, Query, never, never, never, never, never, never>

import { Observable } from 'graphql-typed-client'

export interface Query {
  hello: String
  config: Config
  __typename: String
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

export interface Config {
  figmaAuthUrl: String
  githubAuthUrl: String
  logoutUrl: String
  __typename: String
}

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

export interface MutationError {
  field: String | null
  message: String
  __typename: String
}

export interface MutationStatus {
  success: Boolean
  errors: MutationError[] | null
  __typename: String
}

export interface QueryRequest {
  hello?: boolean | number
  config?: ConfigRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ConfigRequest {
  figmaAuthUrl?: boolean | number
  githubAuthUrl?: boolean | number
  logoutUrl?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationErrorRequest {
  field?: boolean | number
  message?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationStatusRequest {
  success?: boolean | number
  errors?: MutationErrorRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const Config_possibleTypes = ['Config']
export const isConfig = (obj: { __typename: String }): obj is Config => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Config_possibleTypes.includes(obj.__typename)
}

const MutationError_possibleTypes = ['MutationError']
export const isMutationError = (obj: { __typename: String }): obj is MutationError => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MutationError_possibleTypes.includes(obj.__typename)
}

const MutationStatus_possibleTypes = ['MutationStatus']
export const isMutationStatus = (obj: { __typename: String }): obj is MutationStatus => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MutationStatus_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  hello: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  config: ConfigPromiseChain & { execute: (request: ConfigRequest, defaultValue?: Config) => Promise<Config> }
}

export interface QueryObservableChain {
  hello: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  config: ConfigObservableChain & { execute: (request: ConfigRequest, defaultValue?: Config) => Observable<Config> }
}

export interface ConfigPromiseChain {
  figmaAuthUrl: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  githubAuthUrl: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  logoutUrl: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ConfigObservableChain {
  figmaAuthUrl: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  githubAuthUrl: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  logoutUrl: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface MutationErrorPromiseChain {
  field: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  message: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface MutationErrorObservableChain {
  field: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  message: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface MutationStatusPromiseChain {
  success: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  errors: {
    execute: (request: MutationErrorRequest, defaultValue?: MutationError[] | null) => Promise<MutationError[] | null>
  }
}

export interface MutationStatusObservableChain {
  success: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  errors: {
    execute: (request: MutationErrorRequest, defaultValue?: MutationError[] | null) => Observable<MutationError[] | null>
  }
}

import { Observable } from 'graphql-typed-client'

export interface Query {
  hello: String
  config: Config
  currentUser: User | null
  cliAuthSession: CliAuthSession | null
  teams: Team[]
  team: Team | null
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

export interface User {
  id: ID
  name: String
  figmaConnected: Boolean
  githubConnected: Boolean
  __typename: String
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

export interface CliAuthSession {
  url: String
  cliAuthToken: String
  userAuthToken: String | null
  __typename: String
}

export interface Team {
  id: ID
  name: String
  role: String
  component: Component | null
  components: Component[]
  __typename: String
}

export interface Component {
  id: ID
  name: String
  team: Team
  samples: Sample[]
  __typename: String
}

export interface Sample {
  id: ID
  name: String
  component: Component
  renders: Render[]
  __typename: String
}

export interface Render {
  id: ID
  createdAt: String
  imageUrl: String | null
  html: String
  branch: String
  commit: String
  sample: Sample
  __typename: String
}

export interface Mutation {
  logout: LogoutResponse | null
  createCliAuthSession: CreateCliAuthSessionResponse | null
  createTeam: CreateTeamResponse | null
  createComponent: CreateComponentResponse | null
  createSample: CreateSampleResponse | null
  createRender: CreateRenderResponse | null
  __typename: String
}

export interface LogoutResponse {
  status: MutationStatus | null
  __typename: String
}

export interface MutationStatus {
  success: Boolean
  errors: MutationError[] | null
  __typename: String
}

export interface MutationError {
  field: String | null
  message: String
  __typename: String
}

export interface CreateCliAuthSessionResponse {
  cliAuthSession: CliAuthSession | null
  status: MutationStatus
  __typename: String
}

export interface CreateTeamResponse {
  team: Team | null
  status: MutationStatus
  __typename: String
}

export interface CreateComponentResponse {
  component: Component | null
  status: MutationStatus
  __typename: String
}

export interface CreateSampleResponse {
  sample: Sample | null
  status: MutationStatus
  __typename: String
}

export interface CreateRenderResponse {
  render: Render | null
  status: MutationStatus
  __typename: String
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.  */
export type Int = number

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).  */
export type Float = number

export interface QueryRequest {
  hello?: boolean | number
  config?: ConfigRequest
  currentUser?: UserRequest
  cliAuthSession?: [{ cliAuthToken: String }, CliAuthSessionRequest]
  teams?: TeamRequest
  team?: [{ id: ID }, TeamRequest]
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

export interface UserRequest {
  id?: boolean | number
  name?: boolean | number
  figmaConnected?: boolean | number
  githubConnected?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CliAuthSessionRequest {
  url?: boolean | number
  cliAuthToken?: boolean | number
  userAuthToken?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TeamRequest {
  id?: boolean | number
  name?: boolean | number
  role?: boolean | number
  component?: [{ id: ID }, ComponentRequest]
  components?: ComponentRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ComponentRequest {
  id?: boolean | number
  name?: boolean | number
  team?: TeamRequest
  samples?: SampleRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SampleRequest {
  id?: boolean | number
  name?: boolean | number
  component?: ComponentRequest
  renders?: RenderRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface RenderRequest {
  id?: boolean | number
  createdAt?: boolean | number
  imageUrl?: boolean | number
  html?: boolean | number
  branch?: boolean | number
  commit?: boolean | number
  sample?: SampleRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationRequest {
  logout?: LogoutResponseRequest
  createCliAuthSession?: CreateCliAuthSessionResponseRequest
  createTeam?: [{ input: CreateTeamInput }, CreateTeamResponseRequest]
  createComponent?: [{ input: CreateComponentInput }, CreateComponentResponseRequest]
  createSample?: [{ input: CreateSampleInput }, CreateSampleResponseRequest]
  createRender?: [{ input: CreateRenderInput }, CreateRenderResponseRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface LogoutResponseRequest {
  status?: MutationStatusRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationStatusRequest {
  success?: boolean | number
  errors?: MutationErrorRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationErrorRequest {
  field?: boolean | number
  message?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CreateCliAuthSessionResponseRequest {
  cliAuthSession?: CliAuthSessionRequest
  status?: MutationStatusRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CreateTeamInput {
  name: String
  figmaTeamId?: String | null
}

export interface CreateTeamResponseRequest {
  team?: TeamRequest
  status?: MutationStatusRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CreateComponentInput {
  teamId: ID
  name: String
}

export interface CreateComponentResponseRequest {
  component?: ComponentRequest
  status?: MutationStatusRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CreateSampleInput {
  componentId: ID
  name: String
}

export interface CreateSampleResponseRequest {
  sample?: SampleRequest
  status?: MutationStatusRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CreateRenderInput {
  componentName: String
  sampleName: String
  html: String
  imageUrl?: String | null
  branch: String
  commit: String
}

export interface CreateRenderResponseRequest {
  render?: RenderRequest
  status?: MutationStatusRequest
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

const User_possibleTypes = ['User']
export const isUser = (obj: { __typename: String }): obj is User => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return User_possibleTypes.includes(obj.__typename)
}

const CliAuthSession_possibleTypes = ['CliAuthSession']
export const isCliAuthSession = (obj: { __typename: String }): obj is CliAuthSession => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CliAuthSession_possibleTypes.includes(obj.__typename)
}

const Team_possibleTypes = ['Team']
export const isTeam = (obj: { __typename: String }): obj is Team => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Team_possibleTypes.includes(obj.__typename)
}

const Component_possibleTypes = ['Component']
export const isComponent = (obj: { __typename: String }): obj is Component => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Component_possibleTypes.includes(obj.__typename)
}

const Sample_possibleTypes = ['Sample']
export const isSample = (obj: { __typename: String }): obj is Sample => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Sample_possibleTypes.includes(obj.__typename)
}

const Render_possibleTypes = ['Render']
export const isRender = (obj: { __typename: String }): obj is Render => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Render_possibleTypes.includes(obj.__typename)
}

const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj: { __typename: String }): obj is Mutation => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Mutation_possibleTypes.includes(obj.__typename)
}

const LogoutResponse_possibleTypes = ['LogoutResponse']
export const isLogoutResponse = (obj: { __typename: String }): obj is LogoutResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return LogoutResponse_possibleTypes.includes(obj.__typename)
}

const MutationStatus_possibleTypes = ['MutationStatus']
export const isMutationStatus = (obj: { __typename: String }): obj is MutationStatus => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MutationStatus_possibleTypes.includes(obj.__typename)
}

const MutationError_possibleTypes = ['MutationError']
export const isMutationError = (obj: { __typename: String }): obj is MutationError => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MutationError_possibleTypes.includes(obj.__typename)
}

const CreateCliAuthSessionResponse_possibleTypes = ['CreateCliAuthSessionResponse']
export const isCreateCliAuthSessionResponse = (obj: { __typename: String }): obj is CreateCliAuthSessionResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CreateCliAuthSessionResponse_possibleTypes.includes(obj.__typename)
}

const CreateTeamResponse_possibleTypes = ['CreateTeamResponse']
export const isCreateTeamResponse = (obj: { __typename: String }): obj is CreateTeamResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CreateTeamResponse_possibleTypes.includes(obj.__typename)
}

const CreateComponentResponse_possibleTypes = ['CreateComponentResponse']
export const isCreateComponentResponse = (obj: { __typename: String }): obj is CreateComponentResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CreateComponentResponse_possibleTypes.includes(obj.__typename)
}

const CreateSampleResponse_possibleTypes = ['CreateSampleResponse']
export const isCreateSampleResponse = (obj: { __typename: String }): obj is CreateSampleResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CreateSampleResponse_possibleTypes.includes(obj.__typename)
}

const CreateRenderResponse_possibleTypes = ['CreateRenderResponse']
export const isCreateRenderResponse = (obj: { __typename: String }): obj is CreateRenderResponse => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CreateRenderResponse_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  hello: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  config: ConfigPromiseChain & { execute: (request: ConfigRequest, defaultValue?: Config) => Promise<Config> }
  currentUser: UserPromiseChain & { execute: (request: UserRequest, defaultValue?: User | null) => Promise<User | null> }
  cliAuthSession: (args: {
    cliAuthToken: String
  }) => CliAuthSessionPromiseChain & {
    execute: (request: CliAuthSessionRequest, defaultValue?: CliAuthSession | null) => Promise<CliAuthSession | null>
  }
  teams: { execute: (request: TeamRequest, defaultValue?: Team[]) => Promise<Team[]> }
  team: (args: {
    id: ID
  }) => TeamPromiseChain & { execute: (request: TeamRequest, defaultValue?: Team | null) => Promise<Team | null> }
}

export interface QueryObservableChain {
  hello: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  config: ConfigObservableChain & { execute: (request: ConfigRequest, defaultValue?: Config) => Observable<Config> }
  currentUser: UserObservableChain & {
    execute: (request: UserRequest, defaultValue?: User | null) => Observable<User | null>
  }
  cliAuthSession: (args: {
    cliAuthToken: String
  }) => CliAuthSessionObservableChain & {
    execute: (request: CliAuthSessionRequest, defaultValue?: CliAuthSession | null) => Observable<CliAuthSession | null>
  }
  teams: { execute: (request: TeamRequest, defaultValue?: Team[]) => Observable<Team[]> }
  team: (args: {
    id: ID
  }) => TeamObservableChain & { execute: (request: TeamRequest, defaultValue?: Team | null) => Observable<Team | null> }
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

export interface UserPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  figmaConnected: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  githubConnected: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
}

export interface UserObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  figmaConnected: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  githubConnected: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
}

export interface CliAuthSessionPromiseChain {
  url: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  cliAuthToken: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  userAuthToken: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
}

export interface CliAuthSessionObservableChain {
  url: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  cliAuthToken: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  userAuthToken: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
}

export interface TeamPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  role: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  component: (args: {
    id: ID
  }) => ComponentPromiseChain & {
    execute: (request: ComponentRequest, defaultValue?: Component | null) => Promise<Component | null>
  }
  components: { execute: (request: ComponentRequest, defaultValue?: Component[]) => Promise<Component[]> }
}

export interface TeamObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  role: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  component: (args: {
    id: ID
  }) => ComponentObservableChain & {
    execute: (request: ComponentRequest, defaultValue?: Component | null) => Observable<Component | null>
  }
  components: { execute: (request: ComponentRequest, defaultValue?: Component[]) => Observable<Component[]> }
}

export interface ComponentPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  team: TeamPromiseChain & { execute: (request: TeamRequest, defaultValue?: Team) => Promise<Team> }
  samples: { execute: (request: SampleRequest, defaultValue?: Sample[]) => Promise<Sample[]> }
}

export interface ComponentObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  team: TeamObservableChain & { execute: (request: TeamRequest, defaultValue?: Team) => Observable<Team> }
  samples: { execute: (request: SampleRequest, defaultValue?: Sample[]) => Observable<Sample[]> }
}

export interface SamplePromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  component: ComponentPromiseChain & { execute: (request: ComponentRequest, defaultValue?: Component) => Promise<Component> }
  renders: { execute: (request: RenderRequest, defaultValue?: Render[]) => Promise<Render[]> }
}

export interface SampleObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID> }
  name: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  component: ComponentObservableChain & {
    execute: (request: ComponentRequest, defaultValue?: Component) => Observable<Component>
  }
  renders: { execute: (request: RenderRequest, defaultValue?: Render[]) => Observable<Render[]> }
}

export interface RenderPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID> }
  createdAt: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  imageUrl: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  html: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  branch: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  commit: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  sample: SamplePromiseChain & { execute: (request: SampleRequest, defaultValue?: Sample) => Promise<Sample> }
}

export interface RenderObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID> }
  createdAt: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  imageUrl: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  html: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  branch: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  commit: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  sample: SampleObservableChain & { execute: (request: SampleRequest, defaultValue?: Sample) => Observable<Sample> }
}

export interface MutationPromiseChain {
  logout: LogoutResponsePromiseChain & {
    execute: (request: LogoutResponseRequest, defaultValue?: LogoutResponse | null) => Promise<LogoutResponse | null>
  }
  createCliAuthSession: CreateCliAuthSessionResponsePromiseChain & {
    execute: (
      request: CreateCliAuthSessionResponseRequest,
      defaultValue?: CreateCliAuthSessionResponse | null,
    ) => Promise<CreateCliAuthSessionResponse | null>
  }
  createTeam: (args: {
    input: CreateTeamInput
  }) => CreateTeamResponsePromiseChain & {
    execute: (
      request: CreateTeamResponseRequest,
      defaultValue?: CreateTeamResponse | null,
    ) => Promise<CreateTeamResponse | null>
  }
  createComponent: (args: {
    input: CreateComponentInput
  }) => CreateComponentResponsePromiseChain & {
    execute: (
      request: CreateComponentResponseRequest,
      defaultValue?: CreateComponentResponse | null,
    ) => Promise<CreateComponentResponse | null>
  }
  createSample: (args: {
    input: CreateSampleInput
  }) => CreateSampleResponsePromiseChain & {
    execute: (
      request: CreateSampleResponseRequest,
      defaultValue?: CreateSampleResponse | null,
    ) => Promise<CreateSampleResponse | null>
  }
  createRender: (args: {
    input: CreateRenderInput
  }) => CreateRenderResponsePromiseChain & {
    execute: (
      request: CreateRenderResponseRequest,
      defaultValue?: CreateRenderResponse | null,
    ) => Promise<CreateRenderResponse | null>
  }
}

export interface MutationObservableChain {
  logout: LogoutResponseObservableChain & {
    execute: (request: LogoutResponseRequest, defaultValue?: LogoutResponse | null) => Observable<LogoutResponse | null>
  }
  createCliAuthSession: CreateCliAuthSessionResponseObservableChain & {
    execute: (
      request: CreateCliAuthSessionResponseRequest,
      defaultValue?: CreateCliAuthSessionResponse | null,
    ) => Observable<CreateCliAuthSessionResponse | null>
  }
  createTeam: (args: {
    input: CreateTeamInput
  }) => CreateTeamResponseObservableChain & {
    execute: (
      request: CreateTeamResponseRequest,
      defaultValue?: CreateTeamResponse | null,
    ) => Observable<CreateTeamResponse | null>
  }
  createComponent: (args: {
    input: CreateComponentInput
  }) => CreateComponentResponseObservableChain & {
    execute: (
      request: CreateComponentResponseRequest,
      defaultValue?: CreateComponentResponse | null,
    ) => Observable<CreateComponentResponse | null>
  }
  createSample: (args: {
    input: CreateSampleInput
  }) => CreateSampleResponseObservableChain & {
    execute: (
      request: CreateSampleResponseRequest,
      defaultValue?: CreateSampleResponse | null,
    ) => Observable<CreateSampleResponse | null>
  }
  createRender: (args: {
    input: CreateRenderInput
  }) => CreateRenderResponseObservableChain & {
    execute: (
      request: CreateRenderResponseRequest,
      defaultValue?: CreateRenderResponse | null,
    ) => Observable<CreateRenderResponse | null>
  }
}

export interface LogoutResponsePromiseChain {
  status: MutationStatusPromiseChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus | null) => Promise<MutationStatus | null>
  }
}

export interface LogoutResponseObservableChain {
  status: MutationStatusObservableChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus | null) => Observable<MutationStatus | null>
  }
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

export interface MutationErrorPromiseChain {
  field: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  message: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface MutationErrorObservableChain {
  field: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  message: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface CreateCliAuthSessionResponsePromiseChain {
  cliAuthSession: CliAuthSessionPromiseChain & {
    execute: (request: CliAuthSessionRequest, defaultValue?: CliAuthSession | null) => Promise<CliAuthSession | null>
  }
  status: MutationStatusPromiseChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Promise<MutationStatus>
  }
}

export interface CreateCliAuthSessionResponseObservableChain {
  cliAuthSession: CliAuthSessionObservableChain & {
    execute: (request: CliAuthSessionRequest, defaultValue?: CliAuthSession | null) => Observable<CliAuthSession | null>
  }
  status: MutationStatusObservableChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Observable<MutationStatus>
  }
}

export interface CreateTeamResponsePromiseChain {
  team: TeamPromiseChain & { execute: (request: TeamRequest, defaultValue?: Team | null) => Promise<Team | null> }
  status: MutationStatusPromiseChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Promise<MutationStatus>
  }
}

export interface CreateTeamResponseObservableChain {
  team: TeamObservableChain & { execute: (request: TeamRequest, defaultValue?: Team | null) => Observable<Team | null> }
  status: MutationStatusObservableChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Observable<MutationStatus>
  }
}

export interface CreateComponentResponsePromiseChain {
  component: ComponentPromiseChain & {
    execute: (request: ComponentRequest, defaultValue?: Component | null) => Promise<Component | null>
  }
  status: MutationStatusPromiseChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Promise<MutationStatus>
  }
}

export interface CreateComponentResponseObservableChain {
  component: ComponentObservableChain & {
    execute: (request: ComponentRequest, defaultValue?: Component | null) => Observable<Component | null>
  }
  status: MutationStatusObservableChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Observable<MutationStatus>
  }
}

export interface CreateSampleResponsePromiseChain {
  sample: SamplePromiseChain & { execute: (request: SampleRequest, defaultValue?: Sample | null) => Promise<Sample | null> }
  status: MutationStatusPromiseChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Promise<MutationStatus>
  }
}

export interface CreateSampleResponseObservableChain {
  sample: SampleObservableChain & {
    execute: (request: SampleRequest, defaultValue?: Sample | null) => Observable<Sample | null>
  }
  status: MutationStatusObservableChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Observable<MutationStatus>
  }
}

export interface CreateRenderResponsePromiseChain {
  render: RenderPromiseChain & { execute: (request: RenderRequest, defaultValue?: Render | null) => Promise<Render | null> }
  status: MutationStatusPromiseChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Promise<MutationStatus>
  }
}

export interface CreateRenderResponseObservableChain {
  render: RenderObservableChain & {
    execute: (request: RenderRequest, defaultValue?: Render | null) => Observable<Render | null>
  }
  status: MutationStatusObservableChain & {
    execute: (request: MutationStatusRequest, defaultValue?: MutationStatus) => Observable<MutationStatus>
  }
}

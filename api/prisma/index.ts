// Code generated by Prisma (prisma@1.29.1). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  membership: (where?: MembershipWhereInput) => Promise<boolean>;
  team: (where?: TeamWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  membership: (where: MembershipWhereUniqueInput) => MembershipPromise;
  memberships: (
    args?: {
      where?: MembershipWhereInput;
      orderBy?: MembershipOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<Membership>;
  membershipsConnection: (
    args?: {
      where?: MembershipWhereInput;
      orderBy?: MembershipOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => MembershipConnectionPromise;
  team: (where: TeamWhereUniqueInput) => TeamPromise;
  teams: (
    args?: {
      where?: TeamWhereInput;
      orderBy?: TeamOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<Team>;
  teamsConnection: (
    args?: {
      where?: TeamWhereInput;
      orderBy?: TeamOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => TeamConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserPromise;
  users: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<User>;
  usersConnection: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createMembership: (data: MembershipCreateInput) => MembershipPromise;
  updateMembership: (
    args: { data: MembershipUpdateInput; where: MembershipWhereUniqueInput }
  ) => MembershipPromise;
  updateManyMemberships: (
    args: {
      data: MembershipUpdateManyMutationInput;
      where?: MembershipWhereInput;
    }
  ) => BatchPayloadPromise;
  upsertMembership: (
    args: {
      where: MembershipWhereUniqueInput;
      create: MembershipCreateInput;
      update: MembershipUpdateInput;
    }
  ) => MembershipPromise;
  deleteMembership: (where: MembershipWhereUniqueInput) => MembershipPromise;
  deleteManyMemberships: (where?: MembershipWhereInput) => BatchPayloadPromise;
  createTeam: (data: TeamCreateInput) => TeamPromise;
  updateTeam: (
    args: { data: TeamUpdateInput; where: TeamWhereUniqueInput }
  ) => TeamPromise;
  updateManyTeams: (
    args: { data: TeamUpdateManyMutationInput; where?: TeamWhereInput }
  ) => BatchPayloadPromise;
  upsertTeam: (
    args: {
      where: TeamWhereUniqueInput;
      create: TeamCreateInput;
      update: TeamUpdateInput;
    }
  ) => TeamPromise;
  deleteTeam: (where: TeamWhereUniqueInput) => TeamPromise;
  deleteManyTeams: (where?: TeamWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (
    args: { data: UserUpdateInput; where: UserWhereUniqueInput }
  ) => UserPromise;
  updateManyUsers: (
    args: { data: UserUpdateManyMutationInput; where?: UserWhereInput }
  ) => BatchPayloadPromise;
  upsertUser: (
    args: {
      where: UserWhereUniqueInput;
      create: UserCreateInput;
      update: UserUpdateInput;
    }
  ) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  membership: (
    where?: MembershipSubscriptionWhereInput
  ) => MembershipSubscriptionPayloadSubscription;
  team: (
    where?: TeamSubscriptionWhereInput
  ) => TeamSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type MembershipOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "role_ASC"
  | "role_DESC";

export type TeamOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "name_ASC"
  | "name_DESC";

export type Role = "MEMBER" | "ADMIN";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "email_ASC"
  | "email_DESC"
  | "name_ASC"
  | "name_DESC"
  | "githubAccessToken_ASC"
  | "githubAccessToken_DESC"
  | "figmaAccessToken_ASC"
  | "figmaAccessToken_DESC"
  | "figmaRefreshToken_ASC"
  | "figmaRefreshToken_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserUpsertWithoutMembershipsInput {
  update: UserUpdateWithoutMembershipsDataInput;
  create: UserCreateWithoutMembershipsInput;
}

export type MembershipWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface MembershipUpdateManyMutationInput {
  role?: Role;
}

export interface MembershipWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  role?: Role;
  role_not?: Role;
  role_in?: Role[] | Role;
  role_not_in?: Role[] | Role;
  user?: UserWhereInput;
  team?: TeamWhereInput;
  AND?: MembershipWhereInput[] | MembershipWhereInput;
  OR?: MembershipWhereInput[] | MembershipWhereInput;
  NOT?: MembershipWhereInput[] | MembershipWhereInput;
}

export interface UserCreateOneWithoutMembershipsInput {
  create?: UserCreateWithoutMembershipsInput;
  connect?: UserWhereUniqueInput;
}

export interface MembershipUpdateWithWhereUniqueWithoutTeamInput {
  where: MembershipWhereUniqueInput;
  data: MembershipUpdateWithoutTeamDataInput;
}

export interface UserCreateWithoutMembershipsInput {
  email: String;
  name: String;
  githubAccessToken?: String;
  figmaAccessToken?: String;
  figmaRefreshToken?: String;
}

export interface TeamWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  memberships_every?: MembershipWhereInput;
  memberships_some?: MembershipWhereInput;
  memberships_none?: MembershipWhereInput;
  AND?: TeamWhereInput[] | TeamWhereInput;
  OR?: TeamWhereInput[] | TeamWhereInput;
  NOT?: TeamWhereInput[] | TeamWhereInput;
}

export interface TeamCreateOneWithoutMembershipsInput {
  create?: TeamCreateWithoutMembershipsInput;
  connect?: TeamWhereUniqueInput;
}

export interface TeamSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: TeamWhereInput;
  AND?: TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput;
  OR?: TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput;
  NOT?: TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput;
}

export interface TeamCreateWithoutMembershipsInput {
  name: String;
}

export interface UserUpdateManyMutationInput {
  email?: String;
  name?: String;
  githubAccessToken?: String;
  figmaAccessToken?: String;
  figmaRefreshToken?: String;
}

export interface MembershipUpdateInput {
  role?: Role;
  user?: UserUpdateOneRequiredWithoutMembershipsInput;
  team?: TeamUpdateOneRequiredWithoutMembershipsInput;
}

export interface MembershipUpdateWithoutUserDataInput {
  role?: Role;
  team?: TeamUpdateOneRequiredWithoutMembershipsInput;
}

export interface UserUpdateOneRequiredWithoutMembershipsInput {
  create?: UserCreateWithoutMembershipsInput;
  update?: UserUpdateWithoutMembershipsDataInput;
  upsert?: UserUpsertWithoutMembershipsInput;
  connect?: UserWhereUniqueInput;
}

export type TeamWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface UserUpdateWithoutMembershipsDataInput {
  email?: String;
  name?: String;
  githubAccessToken?: String;
  figmaAccessToken?: String;
  figmaRefreshToken?: String;
}

export interface UserUpdateInput {
  email?: String;
  name?: String;
  githubAccessToken?: String;
  figmaAccessToken?: String;
  figmaRefreshToken?: String;
  memberships?: MembershipUpdateManyWithoutUserInput;
}

export interface MembershipScalarWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  role?: Role;
  role_not?: Role;
  role_in?: Role[] | Role;
  role_not_in?: Role[] | Role;
  AND?: MembershipScalarWhereInput[] | MembershipScalarWhereInput;
  OR?: MembershipScalarWhereInput[] | MembershipScalarWhereInput;
  NOT?: MembershipScalarWhereInput[] | MembershipScalarWhereInput;
}

export interface MembershipCreateManyWithoutUserInput {
  create?:
    | MembershipCreateWithoutUserInput[]
    | MembershipCreateWithoutUserInput;
  connect?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
}

export interface TeamUpdateOneRequiredWithoutMembershipsInput {
  create?: TeamCreateWithoutMembershipsInput;
  update?: TeamUpdateWithoutMembershipsDataInput;
  upsert?: TeamUpsertWithoutMembershipsInput;
  connect?: TeamWhereUniqueInput;
}

export interface UserCreateInput {
  email: String;
  name: String;
  githubAccessToken?: String;
  figmaAccessToken?: String;
  figmaRefreshToken?: String;
  memberships?: MembershipCreateManyWithoutUserInput;
}

export interface TeamUpdateWithoutMembershipsDataInput {
  name?: String;
}

export interface MembershipUpdateManyDataInput {
  role?: Role;
}

export interface TeamUpsertWithoutMembershipsInput {
  update: TeamUpdateWithoutMembershipsDataInput;
  create: TeamCreateWithoutMembershipsInput;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  githubAccessToken?: String;
  githubAccessToken_not?: String;
  githubAccessToken_in?: String[] | String;
  githubAccessToken_not_in?: String[] | String;
  githubAccessToken_lt?: String;
  githubAccessToken_lte?: String;
  githubAccessToken_gt?: String;
  githubAccessToken_gte?: String;
  githubAccessToken_contains?: String;
  githubAccessToken_not_contains?: String;
  githubAccessToken_starts_with?: String;
  githubAccessToken_not_starts_with?: String;
  githubAccessToken_ends_with?: String;
  githubAccessToken_not_ends_with?: String;
  figmaAccessToken?: String;
  figmaAccessToken_not?: String;
  figmaAccessToken_in?: String[] | String;
  figmaAccessToken_not_in?: String[] | String;
  figmaAccessToken_lt?: String;
  figmaAccessToken_lte?: String;
  figmaAccessToken_gt?: String;
  figmaAccessToken_gte?: String;
  figmaAccessToken_contains?: String;
  figmaAccessToken_not_contains?: String;
  figmaAccessToken_starts_with?: String;
  figmaAccessToken_not_starts_with?: String;
  figmaAccessToken_ends_with?: String;
  figmaAccessToken_not_ends_with?: String;
  figmaRefreshToken?: String;
  figmaRefreshToken_not?: String;
  figmaRefreshToken_in?: String[] | String;
  figmaRefreshToken_not_in?: String[] | String;
  figmaRefreshToken_lt?: String;
  figmaRefreshToken_lte?: String;
  figmaRefreshToken_gt?: String;
  figmaRefreshToken_gte?: String;
  figmaRefreshToken_contains?: String;
  figmaRefreshToken_not_contains?: String;
  figmaRefreshToken_starts_with?: String;
  figmaRefreshToken_not_starts_with?: String;
  figmaRefreshToken_ends_with?: String;
  figmaRefreshToken_not_ends_with?: String;
  memberships_every?: MembershipWhereInput;
  memberships_some?: MembershipWhereInput;
  memberships_none?: MembershipWhereInput;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export interface MembershipUpsertWithWhereUniqueWithoutUserInput {
  where: MembershipWhereUniqueInput;
  update: MembershipUpdateWithoutUserDataInput;
  create: MembershipCreateWithoutUserInput;
}

export interface MembershipUpsertWithWhereUniqueWithoutTeamInput {
  where: MembershipWhereUniqueInput;
  update: MembershipUpdateWithoutTeamDataInput;
  create: MembershipCreateWithoutTeamInput;
}

export interface MembershipUpdateManyWithoutUserInput {
  create?:
    | MembershipCreateWithoutUserInput[]
    | MembershipCreateWithoutUserInput;
  delete?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  connect?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  set?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  disconnect?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  update?:
    | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    | MembershipUpdateWithWhereUniqueWithoutUserInput;
  upsert?:
    | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    | MembershipUpsertWithWhereUniqueWithoutUserInput;
  deleteMany?: MembershipScalarWhereInput[] | MembershipScalarWhereInput;
  updateMany?:
    | MembershipUpdateManyWithWhereNestedInput[]
    | MembershipUpdateManyWithWhereNestedInput;
}

export interface MembershipUpdateWithoutTeamDataInput {
  role?: Role;
  user?: UserUpdateOneRequiredWithoutMembershipsInput;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  email?: String;
}>;

export interface TeamCreateInput {
  name: String;
  memberships?: MembershipCreateManyWithoutTeamInput;
}

export interface MembershipUpdateManyWithWhereNestedInput {
  where: MembershipScalarWhereInput;
  data: MembershipUpdateManyDataInput;
}

export interface MembershipUpdateManyWithoutTeamInput {
  create?:
    | MembershipCreateWithoutTeamInput[]
    | MembershipCreateWithoutTeamInput;
  delete?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  connect?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  set?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  disconnect?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
  update?:
    | MembershipUpdateWithWhereUniqueWithoutTeamInput[]
    | MembershipUpdateWithWhereUniqueWithoutTeamInput;
  upsert?:
    | MembershipUpsertWithWhereUniqueWithoutTeamInput[]
    | MembershipUpsertWithWhereUniqueWithoutTeamInput;
  deleteMany?: MembershipScalarWhereInput[] | MembershipScalarWhereInput;
  updateMany?:
    | MembershipUpdateManyWithWhereNestedInput[]
    | MembershipUpdateManyWithWhereNestedInput;
}

export interface TeamUpdateInput {
  name?: String;
  memberships?: MembershipUpdateManyWithoutTeamInput;
}

export interface MembershipCreateWithoutTeamInput {
  role?: Role;
  user: UserCreateOneWithoutMembershipsInput;
}

export interface MembershipCreateManyWithoutTeamInput {
  create?:
    | MembershipCreateWithoutTeamInput[]
    | MembershipCreateWithoutTeamInput;
  connect?: MembershipWhereUniqueInput[] | MembershipWhereUniqueInput;
}

export interface MembershipCreateInput {
  role?: Role;
  user: UserCreateOneWithoutMembershipsInput;
  team: TeamCreateOneWithoutMembershipsInput;
}

export interface TeamUpdateManyMutationInput {
  name?: String;
}

export interface MembershipCreateWithoutUserInput {
  role?: Role;
  team: TeamCreateOneWithoutMembershipsInput;
}

export interface MembershipUpdateWithWhereUniqueWithoutUserInput {
  where: MembershipWhereUniqueInput;
  data: MembershipUpdateWithoutUserDataInput;
}

export interface MembershipSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: MembershipWhereInput;
  AND?: MembershipSubscriptionWhereInput[] | MembershipSubscriptionWhereInput;
  OR?: MembershipSubscriptionWhereInput[] | MembershipSubscriptionWhereInput;
  NOT?: MembershipSubscriptionWhereInput[] | MembershipSubscriptionWhereInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface MembershipEdge {
  node: Membership;
  cursor: String;
}

export interface MembershipEdgePromise
  extends Promise<MembershipEdge>,
    Fragmentable {
  node: <T = MembershipPromise>() => T;
  cursor: () => Promise<String>;
}

export interface MembershipEdgeSubscription
  extends Promise<AsyncIterator<MembershipEdge>>,
    Fragmentable {
  node: <T = MembershipSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  email: String;
  name: String;
  githubAccessToken?: String;
  figmaAccessToken?: String;
  figmaRefreshToken?: String;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  email: () => Promise<String>;
  name: () => Promise<String>;
  githubAccessToken: () => Promise<String>;
  figmaAccessToken: () => Promise<String>;
  figmaRefreshToken: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  email: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  githubAccessToken: () => Promise<AsyncIterator<String>>;
  figmaAccessToken: () => Promise<AsyncIterator<String>>;
  figmaRefreshToken: () => Promise<AsyncIterator<String>>;
}

export interface TeamPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  name: String;
}

export interface TeamPreviousValuesPromise
  extends Promise<TeamPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
}

export interface TeamPreviousValuesSubscription
  extends Promise<AsyncIterator<TeamPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  name: () => Promise<AsyncIterator<String>>;
}

export interface TeamSubscriptionPayload {
  mutation: MutationType;
  node: Team;
  updatedFields: String[];
  previousValues: TeamPreviousValues;
}

export interface TeamSubscriptionPayloadPromise
  extends Promise<TeamSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = TeamPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = TeamPreviousValuesPromise>() => T;
}

export interface TeamSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<TeamSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = TeamSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = TeamPreviousValuesSubscription>() => T;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateTeam {
  count: Int;
}

export interface AggregateTeamPromise
  extends Promise<AggregateTeam>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateTeamSubscription
  extends Promise<AsyncIterator<AggregateTeam>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface MembershipConnection {
  pageInfo: PageInfo;
  edges: MembershipEdge[];
}

export interface MembershipConnectionPromise
  extends Promise<MembershipConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<MembershipEdge>>() => T;
  aggregate: <T = AggregateMembershipPromise>() => T;
}

export interface MembershipConnectionSubscription
  extends Promise<AsyncIterator<MembershipConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<MembershipEdgeSubscription>>>() => T;
  aggregate: <T = AggregateMembershipSubscription>() => T;
}

export interface TeamConnection {
  pageInfo: PageInfo;
  edges: TeamEdge[];
}

export interface TeamConnectionPromise
  extends Promise<TeamConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<TeamEdge>>() => T;
  aggregate: <T = AggregateTeamPromise>() => T;
}

export interface TeamConnectionSubscription
  extends Promise<AsyncIterator<TeamConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<TeamEdgeSubscription>>>() => T;
  aggregate: <T = AggregateTeamSubscription>() => T;
}

export interface Team {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  name: String;
}

export interface TeamPromise extends Promise<Team>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
  memberships: <T = FragmentableArray<Membership>>(
    args?: {
      where?: MembershipWhereInput;
      orderBy?: MembershipOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface TeamSubscription
  extends Promise<AsyncIterator<Team>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  name: () => Promise<AsyncIterator<String>>;
  memberships: <T = Promise<AsyncIterator<MembershipSubscription>>>(
    args?: {
      where?: MembershipWhereInput;
      orderBy?: MembershipOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface MembershipPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  role: Role;
}

export interface MembershipPreviousValuesPromise
  extends Promise<MembershipPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  role: () => Promise<Role>;
}

export interface MembershipPreviousValuesSubscription
  extends Promise<AsyncIterator<MembershipPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  role: () => Promise<AsyncIterator<Role>>;
}

export interface MembershipSubscriptionPayload {
  mutation: MutationType;
  node: Membership;
  updatedFields: String[];
  previousValues: MembershipPreviousValues;
}

export interface MembershipSubscriptionPayloadPromise
  extends Promise<MembershipSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = MembershipPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = MembershipPreviousValuesPromise>() => T;
}

export interface MembershipSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<MembershipSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = MembershipSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = MembershipPreviousValuesSubscription>() => T;
}

export interface Membership {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  role: Role;
}

export interface MembershipPromise extends Promise<Membership>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  role: () => Promise<Role>;
  user: <T = UserPromise>() => T;
  team: <T = TeamPromise>() => T;
}

export interface MembershipSubscription
  extends Promise<AsyncIterator<Membership>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  role: () => Promise<AsyncIterator<Role>>;
  user: <T = UserSubscription>() => T;
  team: <T = TeamSubscription>() => T;
}

export interface User {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  email: String;
  name: String;
  githubAccessToken?: String;
  figmaAccessToken?: String;
  figmaRefreshToken?: String;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  email: () => Promise<String>;
  name: () => Promise<String>;
  githubAccessToken: () => Promise<String>;
  figmaAccessToken: () => Promise<String>;
  figmaRefreshToken: () => Promise<String>;
  memberships: <T = FragmentableArray<Membership>>(
    args?: {
      where?: MembershipWhereInput;
      orderBy?: MembershipOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  email: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  githubAccessToken: () => Promise<AsyncIterator<String>>;
  figmaAccessToken: () => Promise<AsyncIterator<String>>;
  figmaRefreshToken: () => Promise<AsyncIterator<String>>;
  memberships: <T = Promise<AsyncIterator<MembershipSubscription>>>(
    args?: {
      where?: MembershipWhereInput;
      orderBy?: MembershipOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface TeamEdge {
  node: Team;
  cursor: String;
}

export interface TeamEdgePromise extends Promise<TeamEdge>, Fragmentable {
  node: <T = TeamPromise>() => T;
  cursor: () => Promise<String>;
}

export interface TeamEdgeSubscription
  extends Promise<AsyncIterator<TeamEdge>>,
    Fragmentable {
  node: <T = TeamSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateMembership {
  count: Int;
}

export interface AggregateMembershipPromise
  extends Promise<AggregateMembership>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateMembershipSubscription
  extends Promise<AsyncIterator<AggregateMembership>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Membership",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
export const prisma = new Prisma();

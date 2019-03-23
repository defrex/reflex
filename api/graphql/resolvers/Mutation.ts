import {
  MutationResolvers,
  CreateOrganizationResponse,
} from 'api/graphql/types'
import User from 'api/models/User'
import { Context } from 'api/graphql/Context'
import { CreateUserResponse, LogoutResponse } from 'ui/lib/graphql'

import { success, error } from './lib'
import Organization from 'api/models/Organization'
import Membership from 'api/models/Membership'

export default {
  async createUser(_parent, args, _ctx): Promise<CreateUserResponse> {
    const user = new User()

    user.name = args.input.name
    user.email = args.input.email

    await user.save()

    return success({ user })
  },

  async logout(_parent, _args, ctx): Promise<LogoutResponse> {
    ctx.logout()
    return success()
  },

  async createOrganization(
    _parent,
    args,
    ctx,
  ): Promise<CreateOrganizationResponse> {
    if (!ctx.user) {
      return error('You must be logged in to create an Organization')
    }

    const organization = new Organization()
    organization.assign(args)
    await organization.save()

    const membership = new Membership()
    membership.organization = organization
    membership.user = ctx.user
    membership.role = 'admin'
    await membership.save()

    return success({ organization })
  },
} as MutationResolvers<Context>

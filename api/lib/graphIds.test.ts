import { graphIdforModel, modelForGraphId } from './graphIds'

import connection from 'api/db'
import User from 'api/models/User'

beforeAll(() => connection)

describe('graphIdforModel', () => {
  it('generates an ID', async () => {
    const user = await User.create({})
    const graphId = await graphIdforModel(user)
    expect(graphId).not.toBeNull()
  })
})

describe('modelForGraphId', () => {
  it('generates an ID', async () => {
    const user = new User()
    user.name = 'faker'
    user.email = 'faker@reflexui.com'
    await user.save()

    const graphId = await graphIdforModel(user)
    expect(graphId).not.toBeNull()

    const refetchedUser = await modelForGraphId(graphId)
    expect(refetchedUser).toBeInstanceOf(User)
    expect(refetchedUser.id).toEqual(user.id)
  })
})

import { prisma } from 'api/prisma'

describe('checkSuite', () => {
  it('runs', async () => {
    console.log('PRISMA_ENDPOINT', process.env.PRISMA_ENDPOINT)
    let users = await prisma.users()
    expect(users.length).toBe(0)

    await prisma.createUser({
      email: 'aron@defrex.com',
      name: 'aron',
    })

    users = await prisma.users()
    expect(users.length).toBe(1)
  })
})

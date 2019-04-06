import { prisma } from 'api/prisma'

import checkSuite from './checkSuite'
import { ChecksCreateParams } from '@octokit/rest'

describe('checkSuite', () => {
  it('runs', async () => {
    const user = await prisma.createUser({
      email: 'aron@defrex.com',
      name: 'aron',
    })

    const team = await prisma.createTeam({
      name: 'Reflex',
    })

    await prisma.createMembership({
      role: 'MEMBER',
      team: {
        connect: {
          id: team.id,
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    })

    const repo = await prisma.createRepo({
      name: 'reflex',
      owner: 'reflexui',
      team: {
        connect: {
          id: team.id,
        },
      },
    })

    const component = await prisma.createComponent({
      name: 'Button',
      team: {
        connect: {
          id: team.id,
        },
      },
    })

    // const example =
    await prisma.createExample({
      name: 'Default',
      component: {
        connect: {
          id: component.id,
        },
      },
    })

    const headBranch = 'test_branch'
    const headSha = 'test_sha'
    const githubChechId = 55
    const params = {
      payload: {
        repository: {
          name: repo.name,
          owner: {
            login: repo.owner,
          },
        },
        check_suite: {
          head_branch: headBranch,
          head_sha: headSha,
        },
      },
      github: {
        checks: {
          create: jest.fn((params: ChecksCreateParams) => {
            expect(params.owner).toEqual(repo.owner)
            expect(params.name).toEqual(repo.name)
            expect(params.head_sha).toEqual(headSha)
            expect(params.status).toEqual('in_progress')

            return {
              data: {
                id: githubChechId,
              },
            }
          }),
        },
      },
    }
    await checkSuite(params as any)
    expect(params.github.checks.create).toHaveBeenCalledTimes(1)
  })
})

import { ChecksCreateParams } from '@octokit/rest'
import { prisma } from 'api/prisma'
import checkSuite from './checkSuite'

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

    const sample = await prisma.createSample({
      name: 'Default',
      component: {
        connect: {
          id: component.id,
        },
      },
    })

    const branch = 'test_branch'
    const commit = 'test_sha'
    const githubCheckId = 55
    const params = {
      payload: {
        repository: {
          name: repo.name,
          owner: {
            login: repo.owner,
          },
        },
        check_suite: {
          head_branch: branch,
          head_sha: commit,
        },
      },
      github: {
        checks: {
          create: jest.fn((params: ChecksCreateParams) => {
            expect(params.owner).toEqual(repo.owner)
            expect(params.name).toEqual(repo.name)
            expect(params.head_sha).toEqual(commit)
            expect(params.status).toEqual('in_progress')

            return {
              data: {
                id: githubCheckId,
              },
            }
          }),
        },
      },
    }

    await checkSuite(params as any)
    expect(params.github.checks.create).toHaveBeenCalledTimes(1)

    const check = await prisma.check({ githubCheckId })
    expect(check.branch).toEqual(branch)
    expect(check.commit).toEqual(commit)

    const renders = await prisma.renders({
      where: {
        sample: {
          id: sample.id,
        },
        check: {
          id: check.id,
        },
      },
    })
    expect(renders.length).toBe(1)
    expect(renders[0].imageUrl).not.toBeUndefined()
  })
})

import { ChecksCreateParams, GitGetCommitParams } from '@octokit/rest'
import { prisma } from 'api/prisma'
import checkSuite from './checkSuite'

jest.setTimeout(100000)

describe('checkSuite', () => {
  it('runs', async () => {
    const user = await prisma.createUser({
      email: 'aron@reflexui.com',
      name: 'aron',
      githubAccessToken: '76b9913c468914c252d5e6921109f45680fecca1',
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

    const branch = 'master'
    const commit = '71ff94da332136d2879c9da5b3e479304afff56d'
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
        git: {
          getCommit: jest.fn((params: GitGetCommitParams) => {
            expect(params.owner).toEqual(repo.owner)
            expect(params.repo).toEqual(repo.name)
            expect(params.commit_sha).toEqual(commit)

            return {
              data: {
                author: {
                  email: user.email,
                },
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
    expect(renders[0].html).not.toBeUndefined()
  })
})

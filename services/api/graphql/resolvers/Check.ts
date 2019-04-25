import { AuthenticationError } from 'api/exceptions'
import { Context } from 'api/graphql/Context'
import { CheckResolvers } from 'api/graphql/types'
import { prisma } from 'api/prisma'
import { Octokit } from 'probot'

export default {
  repoArchiveUrl: async (check, _args, ctx) => {
    const { user } = ctx

    if (!user || !user.githubAccessToken) {
      throw new AuthenticationError()
    }

    const repo = await prisma.check({ id: check.id }).repo()

    const octokit = new Octokit({
      auth: `token ${user.githubAccessToken}`,
    })

    const archiveUrl = await octokit.repos.getArchiveLink({
      owner: repo.owner,
      repo: repo.name,
      ref: `${check.branch}/${check.commit}`,
      archive_format: 'tarball',
    })
    // const archive = await fetch(archiveUrl.data as string)

    return archiveUrl.data as string
  },
} as CheckResolvers<Context>

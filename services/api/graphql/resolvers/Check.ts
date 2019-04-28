import { AuthenticationError, GithubError } from 'api/exceptions'
import { Context } from 'api/graphql/Context'
import { CheckResolvers } from 'api/graphql/types'
import { prisma } from 'api/prisma'
import DataURI from 'datauri'
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

    let archive
    try {
      archive = await octokit.repos.getArchiveLink({
        owner: repo.owner,
        repo: repo.name,
        ref: check.commit,
        archive_format: 'tarball',
      })
    } catch (e) {
      console.error(e)
      throw new GithubError(
        `Cannot find archive for ${repo.owner}/${repo.name}@${check.commit}`,
      )
    }
    const uri = new DataURI()
    uri.format('.tar.gz', archive.data as Buffer)
    console.log('archive', uri.content)

    return uri.content
  },
} as CheckResolvers<Context>

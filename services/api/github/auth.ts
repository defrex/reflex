import Octokit from '@octokit/rest'
import config from 'api/config'
import { login } from 'api/lib/auth'
import { authSessionForToken } from 'api/lib/cliAuth'
import { finishOAuthSession, startOAuthSession } from 'api/lib/oAuth'
import { absoluteUrl, encodeGetParams } from 'api/lib/url'
import { prisma, User } from 'api/prisma'
import { Request, Response, Router } from 'express'
import fetch from 'node-fetch'

interface GithubTokenData {
  access_token: string
  scope: string
  token_type: string
}

interface GithubAuthSessionPayload {
  cliAuthToken: string
}

const router = Router()

export const authUrl = absoluteUrl('/api/github/auth/start')
// This path must match the Github App settings
const redirectUri = absoluteUrl('/api/github/auth/finish')

router.get('/start', (req: Request, res: Response) => {
  const session = startOAuthSession<GithubAuthSessionPayload>(req, res, {
    cliAuthToken: req.query.cliAuthToken,
  })

  const githubRedirectUrl = encodeGetParams(
    'https://github.com/login/oauth/authorize',
    {
      client_id: config.githubAuthClientId,
      redirect_uri: redirectUri,
      scope: 'read:org read:user',
      state: session.state,
    },
  )

  res.redirect(githubRedirectUrl)
})

router.get('/finish', async (req: Request, res: Response) => {
  const code = req.query.code
  const state = req.query.state
  const session = finishOAuthSession<GithubAuthSessionPayload>(req, res)

  if (session.state !== state) {
    return res.send(400)
  }

  const githubTokenUrl = encodeGetParams(
    'https://github.com/login/oauth/access_token',
    {
      client_id: config.githubAuthClientId,
      client_secret: config.githubAuthClientSecret,
      redirect_uri: redirectUri,
      code,
      state,
    },
  )

  const tokenRes = await fetch(githubTokenUrl, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  })
  const tokenData: GithubTokenData = await tokenRes.json()

  const octokit = new Octokit({
    auth: `token ${tokenData.access_token}`,
  })

  const githubUserResponse = await octokit.users.getAuthenticated()
  const githubUser = githubUserResponse.data

  let user: User = await prisma.user({ email: githubUser.email })

  if (!user) {
    user = await prisma.createUser({
      name: githubUser.name,
      email: githubUser.email,
      githubAccessToken: tokenData.access_token,
    })
  } else {
    user = await prisma.updateUser({
      data: {
        githubAccessToken: tokenData.access_token,
      },
      where: {
        id: user.id,
      },
    })
  }

  await login(req, res, user)

  if (session.cliAuthToken) {
    const cliAuthSession = await authSessionForToken(session.cliAuthToken)
    if (cliAuthSession) {
      await prisma.updateCliAuthSession({
        data: {
          authenticatedUser: {
            connect: {
              id: user.id,
            },
          },
        },
        where: {
          id: cliAuthSession.id,
        },
      })
    }
  }

  res.redirect('/dashboard')
})

export default router
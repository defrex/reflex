import { Router, Request, Response } from 'express'
import fetch from 'node-fetch'
import Octokit from '@octokit/rest'

import config from 'api/config'
import { absoluteUrl, encodeGetParams } from 'api/lib/url'
import { randomString } from 'api/lib/random'
import User from 'api/models/User'
import { logInUser } from 'api/lib/auth'

interface GithubTokenData {
  access_token: string
  scope: string
  token_type: string
}

const router = Router()

export const authUrl = absoluteUrl('/api/github/auth/start')
// This path must match the Github App settings
const redirectUri = absoluteUrl('/api/github/auth/finish')

router.get('/start', (req: Request, res: Response) => {
  req.session!.githubAuthReferrer = req.get('Referrer')

  const state = randomString()
  req.session!.githubAuthState = state

  const githubRedirectUrl = encodeGetParams(
    'https://github.com/login/oauth/authorize',
    {
      client_id: config.githubAuthClientId,
      redirect_uri: redirectUri,
      scope: 'read:org read:user',
      state: state,
    },
  )

  res.redirect(githubRedirectUrl)
})

router.get('/finish', async (req: Request, res: Response) => {
  const code = req.query.code
  const state = req.query.state

  console.log('💢 session.state', req.session!.githubAuthState)
  console.log('💢 github.state', state)

  // if (req.session!.githubAuthState !== state) {
  //   return res.send(400)
  // }

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

  let user: User | undefined
  user = await User.findOne({ githubUsername: githubUser.login })
  if (!user) {
    user = await User.findOne({ email: githubUser.email })
  }

  if (!user) {
    user = new User()
    user.email = githubUser.email
    user.name = githubUser.name
  }

  user.githubAccessToken = tokenData.access_token
  user.githubUsername = githubUser.login
  user.githubAvatarUrl = githubUser.avatar_url

  await user.save()
  await logInUser(req, user)

  const referrer = req.session!.githubAuthReferrer || '/'
  req.session!.githubAuthReferrer = null
  res.redirect(referrer)
})

export default router

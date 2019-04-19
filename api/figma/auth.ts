import config from 'api/config'
import { currentUser } from 'api/lib/auth'
import { finishOAuthSession, startOAuthSession } from 'api/lib/oAuth'
import { absoluteUrl, encodeGetParams } from 'api/lib/url'
import { prisma } from 'api/prisma'
import { Request, Response, Router } from 'express'
import fetch from 'node-fetch'

interface FigmaTokenData {
  error: boolean
  message: string
  access_token: string
  expires_in: string
  refresh_token: string
}

const router = Router()

export const authUrl = absoluteUrl('/api/figma/auth/start')
// This path must match the Figma App settings
const redirectUri = absoluteUrl('/api/figma/auth/finish')

router.get('/start', async (req: Request, res: Response) => {
  const user = await currentUser(req, res)
  if (!user) {
    res.status(403)
    res.send('Only authenticated users can connect Figma.')
    return
  }

  const session = startOAuthSession(req, res)

  const figmaUrl = encodeGetParams('https://www.figma.com/oauth', {
    client_id: config.figmaClientId,
    redirect_uri: redirectUri,
    state: session.state,
    scope: 'file_read',
    response_type: 'code',
  })
  'https://www.figma.com/oauth?' + [].join('&')

  res.redirect(figmaUrl)
})

router.get('/finish', async (req: Request, res: Response) => {
  const user = await currentUser(req, res)
  if (!user) {
    res.status(403)
    res.send('Only authenticated users can connect Figma.')
    return
  }

  const code = req.query.code
  const state = req.query.state

  if (finishOAuthSession(req, res).state !== state) {
    return res.send(400)
  }

  const figmaUrl = encodeGetParams('https://www.figma.com/api/oauth/token', {
    client_id: config.figmaClientId,
    client_secret: config.figmaClientSecret,
    redirect_uri: redirectUri,
    code,
    grant_type: 'authorization_code',
  })

  const tokenRes = await fetch(figmaUrl, { method: 'POST' })
  const tokenData: FigmaTokenData = await tokenRes.json()

  if (tokenData.error) {
    res.status(400)
    res.send(tokenData.message)
    return
  }

  await prisma.updateUser({
    data: {
      figmaAccessToken: tokenData.access_token,
      figmaRefreshToken: tokenData.refresh_token,
    },
    where: {
      id: user.id,
    },
  })

  res.redirect('/dashboard')
})

export default router

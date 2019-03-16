import { Router, Request, Response } from 'express'
import fetch from 'node-fetch'

import config from 'api/config'
import { absoluteUrl, encodeGetParams } from 'api/lib/url'
import { randomString } from 'api/lib/random'

interface FigmaTokenData {
  access_token: string
  expires_in: string
  refresh_token: string
}

const router = Router()

// This path must match the Figma App settings
const redirectUri = absoluteUrl('/api/figma/auth/finish')

router.get('/auth/start', (req: Request, res: Response) => {
  if (!req.user) {
    res.status(403)
    res.send('Only authenticated users can connect Figma.')
    return
  }

  req.session!.figmaAuthReferrer = req.get('Referrer')

  const state = randomString()
  req.session!.figmaAuthState = state

  const figmaUrl = encodeGetParams('https://www.figma.com/oauth', {
    client_id: config.figmaClientId,
    redirect_uri: redirectUri,
    state: state,
    scope: 'file_read',
    response_type: 'code',
  })
  'https://www.figma.com/oauth?' + [].join('&')

  res.redirect(figmaUrl)
})

router.get('/auth/finish', async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(403)
    res.send('Only authenticated users can connect Figma.')
    return
  }

  const code = req.query.code
  const state = req.query.state

  if (req.session!.figmaAuthState !== state) {
    return res.send(400)
  }

  const figmaUrl = encodeGetParams('https://www.figma.com/api/oauth/token', {
    client_id: config.figmaClientId,
    client_secret: config.figmaClientSecret,
    redirect_uri: redirectUri,
    code,
    grant_type: 'authorization_cod',
  })

  const tokenRes = await fetch(figmaUrl, { method: 'POST' })
  const tokenData: FigmaTokenData = await tokenRes.json()

  req.user.figmaAccessToken = tokenData.access_token
  req.user.figmaRefreshToken = tokenData.refresh_token
  await req.user.save()

  const referrer = req.session!.figmaAuthReferrer || '/'
  req.session!.figmaAuthReferrer = null
  res.redirect(referrer)
})

export default router

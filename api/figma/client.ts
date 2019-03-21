import fetch from 'node-fetch'

import { encodeGetParams } from 'api/lib/url'
import User from 'api/models/User'
import config from 'api/config'

interface FigmaTokenData {
  access_token: string
}

export default class Figma {
  constructor(private user: User) {
    if (!this.user.figmaRefreshToken) {
      throw new Error('Cannon initialize a Figma client with no refresh token')
    }
  }

  me = async () => {
    return this._request('GET', '/v1/me')
  }

  components = async (teamId: string) => {
    return this._request('GET', `/v1/teams/${teamId}/components`)
  }

  file = async (fileId: string) => {
    return this._request('GET', `/v1/files/${fileId}`)
  }

  _request = async (
    method: 'GET' | 'POST',
    path: string,
    params: { [key: string]: string } = {},
    // retry: boolean = false,
  ): Promise<object> => {
    console.log(`🍥._request ${method} ${path}`)

    if (!this.user.figmaAccessToken) {
      await this._refreshToken()
    }

    const figmaUrl = encodeGetParams(`https://api.figma.com${path}`, params)

    const tokenRes = await fetch(figmaUrl, {
      method,
      headers: {
        Authorization: `Bearer ${this.user.figmaAccessToken!}`,
      },
    })
    let response
    try {
      response = await tokenRes.json()
    } catch (error) {
      console.error(error)
      return {}
    }

    // if (response.status && response.status === 403) {
    //   await this._refreshToken()
    //   if (!retry) {
    //     return this._request(method, path, params, true)
    //   }
    // }

    return response
  }

  _refreshToken = async () => {
    console.log('🍥._refreshToken')
    const figmaUrl = encodeGetParams(
      'https://www.figma.com/api/oauth/refresh',
      {
        client_id: config.figmaClientId,
        client_secret: config.figmaClientSecret,
        refresh_token: this.user.figmaRefreshToken!,
      },
    )
    const tokenRes = await fetch(figmaUrl, { method: 'POST' })
    const tokenData: FigmaTokenData = await tokenRes.json()
    this.user.figmaAccessToken = tokenData.access_token
    await this.user.save()
  }
}

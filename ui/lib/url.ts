import config from 'ui/config'

export function absoluteUrl (path: string): string {
  return `${config.ssl ? 'https' : 'http'}://${config.domain}${path}`
}

import config from 'api/config'

export default function absoluteUrl(path: string): string {
  const domain =
    config.environment === 'development'
      ? `${config.domain}:${config.port}`
      : config.domain.split(':')[0]
  return `${config.ssl ? 'https' : 'http'}://${domain}${path}`
}

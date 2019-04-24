import config from 'api/config'

export function absoluteUrl(path: string): string {
  const domain =
    config.environment === 'development'
      ? `${config.domain}:${config.port}`
      : config.domain.split(':')[0]
  return `${config.ssl ? 'https' : 'http'}://${domain}${path}`
}

export function encodeGetParams(
  url: string,
  params: { [key: string]: string },
) {
  return [
    url.replace(/\?$/, ''),
    Object.entries(params)
      .map(([key, value]) =>
        [encodeURIComponent(key), encodeURIComponent(value)].join('='),
      )
      .join('&'),
  ].join('?')
}

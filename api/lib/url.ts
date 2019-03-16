import config from 'api/config'

export function absoluteUrl(path: string): string {
  return `${config.ssl ? 'https' : 'http'}://${config.domain}${path}`
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

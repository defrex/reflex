import config from 'api/config'

export default function uiUrl(path: string): string {
  return `${config.uiUrl.replace(/\/$/, '')}${path}`
}

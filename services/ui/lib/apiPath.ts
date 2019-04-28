export function apiPath(path: string = '/'): string {
  return `${process.env.API_URL}${path}`
}

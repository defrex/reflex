const cwd = process.cwd()
export default function(pathname: string): string {
  return pathname.replace(cwd, '.')
}

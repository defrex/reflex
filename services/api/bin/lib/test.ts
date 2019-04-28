process.env.PRISMA_ENDPOINT = 'http://localhost:4466/local/test'
process.env.PRISMA_SECRET = '2345'
process.env.PORT = `${parseInt(process.env.PORT || '3030') + 1}`
process.env.REFLEX_API_ENDPOINT = `http://localhost:${process.env.PORT}/graphql`

import run from '@reflexui/easy-run'
import api from 'api'
import jest from 'jest-cli'

export default async function main() {
  await run(['prisma', 'reset', '--force'])
  await run(['prisma', 'deploy'])

  const server = await api()

  await jest.run()

  server.close()
}

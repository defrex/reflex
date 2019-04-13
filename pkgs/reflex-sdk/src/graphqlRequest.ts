import fetch from 'node-fetch'

const REFLEX_URL = 'http://localhost:8080'

interface GraphQLRequest {
  operationName?: string
  query: string
  variables: {
    [key: string]: string
  }
}

export default async function graphqlRequest(body: GraphQLRequest): Promise<any> {
  const response = await fetch(`${REFLEX_URL}/api/graphql`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body)
  })
  const jsonBody = await response.json()
  return jsonBody
}

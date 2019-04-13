import Configstore from 'configstore'
import fetch from 'node-fetch'
import ora from 'ora'

const CONFIG_NAME = 'reflex'
const REFLEX_URL = 'http://localhost:8080'

interface GraphQLRequest {
  operationName?: string
  query: string
  variables: {
    [key: string]: string
  }
}

interface CliAuthSession {
  url: string
  cliAuthToken: string
  userAuthToken?: string
}

async function graphqlRequest(body: GraphQLRequest): Promise<any> {
  const response = await fetch(`${REFLEX_URL}/api/graphql`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body)
  })
  const jsonBody = await response.json()
  return jsonBody
}

async function sleep(milis: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milis)
  })
}

async function createCliAuthSession(): Promise<CliAuthSession> {
  const response = await graphqlRequest({
    operationName: 'CreateCliAuthSession',
    variables: {},
    query: `
      mutation CreateCliAuthSession {
        createCliAuthSession {
          cliAuthSession {
            cliAuthToken
            url
          }
          status {
            success
            errors {
              field
              message
            }
          }
        }
      }
    `
  })
  if (!response.data.createCliAuthSession.status.success) {
    console.error(response.data.createCliAuthSession.status)
    throw new Error('Invalid response from CreateCliAuthSession')
  }
  return response.data.createCliAuthSession.cliAuthSession
}

async function waitForUserAuthToken(cliAuthToken: string, tries: number = 0): Promise<string> {
  const response = await graphqlRequest({
    operationName: 'CliAuthSession',
    variables: { cliAuthToken },
    query: `
      query CliAuthSession ($cliAuthToken: String!) {
        cliAuthSession(cliAuthToken: $cliAuthToken) {
          userAuthToken
        }
      }
    `
  })
  if (response.data.cliAuthSession.userAuthToken) {
    return response.data.cliAuthSession.userAuthToken
  } else {
    await sleep(2000)
    return waitForUserAuthToken(cliAuthToken, tries + 1)
  }
}

async function getAuthToken(): Promise<string> {
  const cliAuthSession = await createCliAuthSession()

  console.log(`\nPlease visit:\n${cliAuthSession.url}\n`)
  const spinner = ora('waiting')
  spinner.start()
  const authToken = await waitForUserAuthToken(cliAuthSession.cliAuthToken)
  spinner.stop()
  return authToken
}

export default async function cli() {
  console.log('Hello CLI!')
  const conf = new Configstore(CONFIG_NAME)
  let authToken = conf.get('authToken')
  if (!authToken) {
    authToken = await getAuthToken()
    conf.set('authToken', authToken)
  }
  if (authToken) {
    console.log('We got a token!', authToken)
  }
}

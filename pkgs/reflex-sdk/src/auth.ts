import ora from 'ora'
import graphqlRequest from './graphqlRequest'

interface CliAuthSession {
  url: string
  cliAuthToken: string
  userAuthToken?: string
}

const POLL_WAIT_RUN = 2000 // 2 sec
const POLL_WAIT_TOTAL = 1000 * 60 * 30 // 30 min

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

async function waitForUserAuthToken(cliAuthToken: string, runs: number = 0): Promise<string> {
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
  } else if (POLL_WAIT_RUN * runs >= POLL_WAIT_TOTAL) {
    throw new Error('Timed out waiting for auth')
  } else {
    await sleep(POLL_WAIT_RUN)
    return waitForUserAuthToken(cliAuthToken, runs + 1)
  }
}

export async function getAuthToken(): Promise<string> {
  const cliAuthSession = await createCliAuthSession()

  console.log(`\nPlease visit:\n${cliAuthSession.url}\n`)
  const spinner = ora('waiting')
  spinner.start()
  const authToken = await waitForUserAuthToken(cliAuthSession.cliAuthToken)
  spinner.stop()
  return authToken
}

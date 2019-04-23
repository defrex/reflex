import gql from 'gql-tag'
import ora from 'ora'
import client from './lib/client'
import sleep from './lib/sleep'

interface CliAuthSession {
  url: string
  cliAuthToken: string
  userAuthToken?: string
}

const POLL_WAIT_RUN = 2000 // 2 sec
const POLL_WAIT_TOTAL = 1000 * 60 * 30 // 30 min

const CreateCliAuthSessionMutation = gql`
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

const CliAuthSessionQuery = gql`
  query CliAuthSession($cliAuthToken: String!) {
    cliAuthSession(cliAuthToken: $cliAuthToken) {
      userAuthToken
    }
  }
`

async function createCliAuthSession(): Promise<CliAuthSession> {
  const response = (await client.request(CreateCliAuthSessionMutation)) as any
  return response.createCliAuthSession.cliAuthSession
}

async function waitForUserAuthToken(cliAuthToken: string, runs: number = 0): Promise<string> {
  const response = (await client.request(CliAuthSessionQuery, { cliAuthToken })) as any
  if (response.cliAuthSession.userAuthToken) {
    return response.cliAuthSession.userAuthToken
  } else if (POLL_WAIT_RUN * runs >= POLL_WAIT_TOTAL) {
    throw new Error('Timed out waiting for auth')
  } else {
    await sleep(POLL_WAIT_RUN)
    return waitForUserAuthToken(cliAuthToken, runs + 1)
  }
}

export async function getAuthToken(): Promise<string> {
  const spinner = ora('Authenticating')
  spinner.start()

  let cliAuthSession: CliAuthSession | null = null
  try {
    cliAuthSession = await createCliAuthSession()
  } catch (error) {
    spinner.fail()
    console.error(error)
  }
  if (cliAuthSession === null) {
    return process.exit()
  }

  spinner.clear()

  console.log(`Please visit › ${cliAuthSession.url}`)

  spinner.start()

  let authToken = null
  try {
    authToken = await waitForUserAuthToken(cliAuthSession.cliAuthToken)
  } catch (error) {
    spinner.fail()
    console.error(error)
  }
  if (authToken === null) {
    return process.exit()
  }
  spinner.succeed()

  return authToken
}

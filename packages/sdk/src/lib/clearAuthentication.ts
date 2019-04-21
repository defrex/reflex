import config, { AUTH_KEY } from '../config'
import spinnerOp from './spinnerOp'

export default async function clearAuthentication() {
  await spinnerOp({
    text: 'Logging out',
    run: () => {
      config.delete(AUTH_KEY)
    }
  })
}

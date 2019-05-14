import store, { AUTH_KEY } from '../store'
import spinnerOp from './spinnerOp'

export default async function clearAuthentication() {
  await spinnerOp({
    text: 'Logging out',
    run: () => {
      store.delete(AUTH_KEY)
    },
  })
}

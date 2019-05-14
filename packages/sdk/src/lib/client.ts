import store, { AUTH_KEY } from '../store'
import { ReflexClient } from './ReflexClient'

export default new ReflexClient(store.get(AUTH_KEY))

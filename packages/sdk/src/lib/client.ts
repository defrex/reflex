import config, { AUTH_KEY } from '../config'
import { ReflexClient } from './ReflexClient'

export default new ReflexClient(config.get(AUTH_KEY))

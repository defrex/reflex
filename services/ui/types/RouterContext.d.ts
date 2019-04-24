import { StaticContext } from 'react-router'

export interface RouterContext extends StaticContext {
  redirectUrl?: string
}

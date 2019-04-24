import { Location } from 'history'
import React from 'react'
import { RouterContext } from 'ui/types/RouterContext'
import styles from './styles'

interface NotFoundProps {
  location: Location
  staticContext: RouterContext
}

export default function NotFound({ location, staticContext }: NotFoundProps) {
  if (staticContext) {
    staticContext.statusCode = 404
  }

  return (
    <div className={styles.notFound}>
      <h2>{location.pathname}</h2>
      <p>404 Page Not Found</p>
    </div>
  )
}

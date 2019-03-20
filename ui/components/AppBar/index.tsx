import React, { PureComponent } from 'react'
import routes from 'ui/routes'

import { AppBarQueryFragment } from 'ui/graphqlClient'
import styles from './styles'
import Button from '../Button'

const { Link } = routes

interface AppBarProps {
  query: AppBarQueryFragment
}

export default class AppBar extends PureComponent<AppBarProps> {
  render() {
    const { query } = this.props
    console.log('AppBar', query)
    return (
      <div css={styles.appBarOuter}>
        <div css={styles.appBarInner}>
          <img css={styles.logo} src='/static/protologo.svg' alt='Reflex' />
          <div css={styles.links}>
            {query.currentUser ? (
              <Link route='profile'>
                <a>{query.currentUser.name}</a>
              </Link>
            ) : (
              <Button href={query.config.loginUrl}>Login/Signup</Button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

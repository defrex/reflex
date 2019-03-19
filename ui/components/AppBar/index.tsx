import React, { PureComponent } from 'react'

import { AppBarQueryFragment } from 'ui/gen'
import styles from './styles'
import Button from '../Button'

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
          <div>
            {query.currentUser ? (
              query.currentUser.name
            ) : (
              <Button href={query.config.loginUrl}>Login/Signup</Button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

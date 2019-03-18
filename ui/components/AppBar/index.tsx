import React, { PureComponent } from 'react'

import { AppBarQuery } from 'ui/gen'
import styles from './styles'

interface AppBarProps {
  query: AppBarQuery.Fragment
}

export default class AppBar extends PureComponent<AppBarProps> {
  render() {
    const { query } = this.props
    console.log('AppBar', query)
    return (
      <div css={styles.appBarOuter}>
        <div css={styles.appBarInner}>
          <img css={styles.logo} src='/static/protologo.svg' alt='Reflex' />
        </div>
      </div>
    )
  }
}

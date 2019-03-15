import React, { PureComponent } from 'react'

import styles from './styles'

interface AppBarProps {}

export default class AppBar extends PureComponent<AppBarProps> {
  render () {
    return (
      <div css={styles.appBarOuter}>
        <div css={styles.appBarInner}>
          <img css={styles.logo} src='/static/protologo.svg' alt='Reflex' />
        </div>
      </div>
    )
  }
}

import React, { PureComponent } from 'react'

import styles from './styles'

export default class Body extends PureComponent<
  React.HTMLProps<HTMLBodyElement>
> {
  render() {
    return <body css={styles.body} {...this.props} />
  }
}

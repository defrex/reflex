import React, { PureComponent, ReactNode } from 'react'

import styles from './styles'

interface ButtonProps {
  children: ReactNode
}

export default class Button extends PureComponent<
  ButtonProps & React.HTMLProps<HTMLAnchorElement>
  > {
  render () {
    const { children, ...props } = this.props
    return (
      <a css={styles.root} {...props}>
        {children}
      </a>
    )
  }
}
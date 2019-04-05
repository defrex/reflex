import React, { PureComponent, ReactNode, HTMLProps } from 'react'

import styles from './styles'
import { classes } from 'typestyle'

interface ButtonProps {
  children: ReactNode
  style?: 'light' | 'primary' | 'dark'
  type?: 'button' | 'submit' | 'reset' | undefined
}

const defaultProps = {
  style: 'light',
}

function getStyle(style: ButtonProps['style']): string {
  if (style === 'light') {
    return styles.light
  } else if (style === 'primary') {
    return styles.primary
  } else {
    return ''
  }
}

export default class Button extends PureComponent<
  ButtonProps & HTMLProps<HTMLButtonElement>
> {
  static A: any = null
  static defaultProps = defaultProps

  render() {
    const { children, style, ...props } = this.props
    return (
      <button className={classes(styles.button, getStyle(style))} {...props}>
        {children}
      </button>
    )
  }
}

Button.A = class AnchorButton extends PureComponent<
  ButtonProps & HTMLProps<HTMLAnchorElement>
> {
  static defaultProps = defaultProps

  render() {
    const { children, style, ...props } = this.props
    return (
      <a className={classes(styles.button, getStyle(style))} {...props}>
        {children}
      </a>
    )
  }
}

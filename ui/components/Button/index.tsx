import React, { PureComponent, ReactNode, HTMLProps } from 'react'

import styles from './styles'

interface ButtonProps {
  children: ReactNode
  style: 'light' | 'primary'
}

const defaultProps = {
  style: 'light',
}

class Button extends PureComponent<ButtonProps & HTMLProps<HTMLButtonElement>> {
  static A: any = null

  static defaultProps = {
    ...defaultProps,
    type: 'button',
  }

  render() {
    const { children, style, ...props } = this.props
    return (
      <button css={[styles.button, styles[style]]} {...props}>
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
      <a css={[styles.button, styles[style]]} {...props}>
        {children}
      </a>
    )
  }
}

export default Button

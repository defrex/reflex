import React, { PureComponent } from 'react'

import Link, { LinkProps } from 'ui/components/Link'
import styles from './styles'

interface Crumb extends LinkProps {
  name: string
}

interface ButtonProps {
  children: Crumb[]
}

export default class Button extends PureComponent<
  ButtonProps & React.HTMLProps<HTMLUListElement>
> {
  render() {
    const { children, ...props } = this.props
    return (
      <ul className={styles.root} {...props}>
        {children.map(({ name, ...linkProps }, index) => (
          <li key={index}>
            <Link {...linkProps}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

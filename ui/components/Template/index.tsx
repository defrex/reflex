import React, { PureComponent, ReactNode } from 'react'

import styles from './styles'
import { TemplateQueryFragment } from 'ui/lib/graphql'

interface TemplateProps {
  children: ReactNode
  query: TemplateQueryFragment
}

export default class Template extends PureComponent<
  TemplateProps & React.HTMLProps<HTMLAnchorElement>
> {
  render() {
    const { children, ...props } = this.props
    return (
      <a css={styles.root} {...props}>
        {children}
      </a>
    )
  }
}

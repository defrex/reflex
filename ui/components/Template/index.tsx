import React, { PureComponent, ReactNode } from 'react'

import styles from './styles'
import { TemplateQuery } from './fragments.graphql'

interface TemplateProps {
  children: ReactNode
  query: TemplateQuery
}

export default class Template extends PureComponent<
  TemplateProps & React.HTMLProps<HTMLAnchorElement>
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

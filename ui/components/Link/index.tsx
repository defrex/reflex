import React, { PureComponent, ReactNode } from 'react'
import { LinkProps as NextRoutesLinkProps } from 'next-routes'

import routes from 'ui/routes'

const RoutesLink = routes.Link

interface LinkProps {
  children: ReactNode
}

export default class Link extends PureComponent<
  LinkProps & NextRoutesLinkProps
> {
  render() {
    const { children, ...props } = this.props
    return <RoutesLink {...props}>{children}</RoutesLink>
  }
}

import React, { PureComponent, ReactNode } from 'react'

import routes from 'ui/routes'

const RoutesLink = routes.Link

interface LinkProps {
  children: ReactNode
}

export default class Link extends PureComponent<
  LinkProps & React.HTMLProps<HTMLAnchorElement>
> {
  render() {
    const { children, ...props } = this.props
    return <RoutesLink {...props}>{children}</RoutesLink>
  }
}

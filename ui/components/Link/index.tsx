import React, { PureComponent, ReactNode } from 'react'

// import routes from 'ui/routes'

// const RoutesLink = routes.Link

// TODO: solve routes

interface LinkProps {
  children: ReactNode
  route?: any
}

export default class Link extends PureComponent<LinkProps> {
  render() {
    const { children, ...props } = this.props
    return <a {...props}>{children}</a>
  }
}

import React, { PureComponent } from 'react'
import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from 'react-router-dom'

export type LinkProps = ReactRouterLinkProps

// We can extend this later to remove hard-coded paths
export default class Link extends PureComponent<LinkProps> {
  render() {
    return <ReactRouterLink {...this.props} />
  }
}

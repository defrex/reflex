import React, { PureComponent } from 'react'

import { GithubAuthButtonQueryFragment } from 'ui/lib/graphql'
import Button from 'ui/components/Button'
import Icon from 'ui/components/Icon'

interface GithubAuthButtonProps {
  query: GithubAuthButtonQueryFragment
  children?: string
}

export default class GithubAuthButton extends PureComponent<
  GithubAuthButtonProps
> {
  render() {
    const { query, children } = this.props
    return (
      <Button.A href={query.config.githubAuthUrl}>
        <Icon src='/static/github-logo.svg' alt='GitHub' />
        {children ? children : 'Connect Github'}
      </Button.A>
    )
  }
}

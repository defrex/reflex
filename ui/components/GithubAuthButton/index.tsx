import React, { PureComponent } from 'react'

import { GithubAuthButtonQueryFragment } from 'ui/lib/graphql'
import Button from 'ui/components/Button'

interface GithubAuthButtonProps {
  query: GithubAuthButtonQueryFragment
  children: string
}

export default class GithubAuthButton extends PureComponent<
  GithubAuthButtonProps
> {
  render() {
    const { query, children } = this.props
    return (
      <Button href={query.config.githubAuthUrl}>
        <img src='/static/github-logo.svg' />
        {children ? children : 'Connect Github'}
      </Button>
    )
  }
}

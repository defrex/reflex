import React, { PureComponent } from 'react'

import { GithubAuthButtonQueryFragment } from 'ui/graphqlClient'
import Button from 'ui/components/Button'

interface GithubAuthButtonProps {
  query: GithubAuthButtonQueryFragment
}

export default class GithubAuthButton extends PureComponent<
  GithubAuthButtonProps
> {
  render() {
    const { query } = this.props
    return (
      <Button href={query.config.githubAuthUrl}>
        <img src='/static/github-logo.svg' />
        Connect Github
      </Button>
    )
  }
}

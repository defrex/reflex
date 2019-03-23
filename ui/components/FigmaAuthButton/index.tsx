import React, { PureComponent } from 'react'

import { FigmaAuthButtonQueryFragment } from 'ui/graphqlClient'
import Button from 'ui/components/Button'

interface FigmaAuthButtonProps {
  query: FigmaAuthButtonQueryFragment
}

export default class FigmaAuthButton extends PureComponent<
  FigmaAuthButtonProps
> {
  render() {
    const { query } = this.props
    return (
      <Button href={query.config.figmaAuthUrl}>
        <img src='/static/figma-logo.svg' />
        Connect Figma
      </Button>
    )
  }
}
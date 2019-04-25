import React, { PureComponent } from 'react'

import Button from 'ui/components/Button'
import Icon from 'ui/components/Icon'
import { FigmaAuthButtonQueryFragment } from 'ui/lib/graphql'

interface FigmaAuthButtonProps {
  query: FigmaAuthButtonQueryFragment
}

export default class FigmaAuthButton extends PureComponent<
  FigmaAuthButtonProps
> {
  render() {
    const { query } = this.props
    return (
      <Button.A href={query.config.figmaAuthUrl}>
        <Icon src='/static/figma-logo.svg' alt='Figma' />
        Connect Figma
      </Button.A>
    )
  }
}

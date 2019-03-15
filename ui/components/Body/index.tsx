import React, { PureComponent } from 'react'
import { css } from '@emotion/core'

const style = css`
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
`

export default class Body extends PureComponent<
  React.HTMLProps<HTMLBodyElement>
  > {
  render () {
    return <body css={style} {...this.props} />
  }
}

import React, { PureComponent } from 'react'

import style from './style'

interface IconProps {
  src: string
  alt: string
}

export default class Icon extends PureComponent<IconProps> {
  render() {
    return <img css={style.icon} {...this.props} />
  }
}

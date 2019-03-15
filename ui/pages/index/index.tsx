import React, { PureComponent } from 'react'

import Button from 'ui/components/Button'

import style from './style'

export default class IndexPage extends PureComponent {
  render () {
    return (
      <div css={style.root}>
        <img src='/static/protologo.svg' alt='Reflex' />
        <div css={style.buttonWrapper}>
          <Button href='https://airtable.com/shrT4LTkYvxqJRMSo'>
            Learn More
          </Button>
        </div>
      </div>
    )
  }
}

import React, { PureComponent } from 'react'

import { primary } from 'ui/lib/colors'
import Body from 'ui/components/Body'

export default class Document extends PureComponent {
  render() {
    return (
      <html lang='en-US'>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content={primary} />
          <link rel='manifest' href='/static/manifest.json' />
          <link
            href='https://fonts.googleapis.com/css?family=Source+Sans+Pro'
            rel='stylesheet'
          />
        </head>
        <Body>
          <div id='app' />
        </Body>
      </html>
    )
  }
}

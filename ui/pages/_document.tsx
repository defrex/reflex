import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

import { primary } from 'ui/lib/colors'
import Body from 'ui/components/Body'

export default class ReflexDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <title>Reflex</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content={primary} />
          <link
            href='https://fonts.googleapis.com/css?family=Source+Sans+Pro'
            rel='stylesheet'
          />
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </html>
    )
  }
}

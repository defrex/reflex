import React, { PureComponent } from 'react'

import { primary } from 'ui/lib/colors'

export interface Script {
  src?: string
  content?: string
}

interface DocumentProps {
  scripts: Script[]
  css: string
  html: string
}

export default class Document extends PureComponent<DocumentProps> {
  render() {
    const { html, css, scripts } = this.props
    return (
      <html lang='en-US'>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content={primary} />
          <link rel='manifest' href='/static/manifest.json' />
          <style id='styles'>{css}</style>
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{ __html: html }} />
          {scripts.map(({ src, content }, index) => (
            <script
              key={index}
              src={src}
              dangerouslySetInnerHTML={
                content ? { __html: content } : undefined
              }
            />
          ))}
        </body>
      </html>
    )
  }
}

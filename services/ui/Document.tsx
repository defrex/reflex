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
          <title>Reflex</title>

          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content={primary} />
          <link rel='manifest' href='/static/manifest.json' />

          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/static/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/icon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/icon-16x16.png'
          />

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

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${
              process.env.GOOGLE_ANALYTICS_ID
            }`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
              `,
            }}
          />
        </body>
      </html>
    )
  }
}

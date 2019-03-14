import * as React from 'react'
import Head from 'next/head'

import Button from 'ui/components/Button'

export default class IndexPage extends React.PureComponent {
  render () {
    return (
      <div className='page'>
        <Head>
          <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet'/>
        </Head>
        <img src='/static/protologo.svg' alt='Reflex'/>
        <div className='buttonWrapper'>
          <Button href='https://airtable.com/shrT4LTkYvxqJRMSo'>Learn More</Button>
        </div>
        <style jsx global>{`
          html, body {
            margin: 0;
            min-height: 100vh;
            width: 100vw;
            font-family: 'Source Sans Pro', sans-serif;
          }
        `}</style>
        <style jsx>{`
          .page {
            min-height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;

            background-color: #0a1c35;
          }

          img {
            max-height: 100px;
            display: block;
          }

          .buttonWrapper {
            margin-top: 64px;
          }
        `}</style>
      </div>
    )
  }
}

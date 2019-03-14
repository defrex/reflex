import * as React from 'react'

export default class IndexPage extends React.PureComponent {
  render () {
    return (
      <div className='page'>
        <img src='/static/protologo.svg' alt='Reflex'/>
        <style jsx global>{`
          html, body {
            margin: 0;
            min-height: 100vh;
            width: 100vw;
          }
        `}</style>
        <style jsx>{`
          .page {
            min-height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0a1c35;
          }

          img {
            max-height: 100px;
          }
        `}</style>
      </div>
    )
  }
}

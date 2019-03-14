import * as React from 'react'

interface ButtonProps {
  children: any
}

export default class Button extends React.PureComponent<ButtonProps & React.HTMLProps<HTMLAnchorElement>> {
  render () {
    const { children, ...props } = this.props
    return (
      <a className='button' {...props}>
        {children}
        <style jsx>{`
          .button {
            background-color: white;
            padding: 8px 16px;
            border-radius: 4px;

            color: #0a1c35;
            text-decoration: none;
          }

          .button:hover {
            background-color: #f3f8ff;
          }

          .button:active {
            background-color: #e5f0ff;
          }
        `}</style>
      </a>
    )
  }
}

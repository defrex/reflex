import React, { PureComponent } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import solarisedDark from 'react-syntax-highlighter/dist/styles/hljs/solarized-dark'

import styles from './styles'

interface TemplateProps {
  children: string
  language?: string
}

export default class Template extends PureComponent<TemplateProps> {
  static defaultProps = {
    language: 'javascript',
  }

  render() {
    const { children, language } = this.props
    return (
      <SyntaxHighlighter
        language={language}
        style={solarisedDark}
        className={styles.code}
      >
        {children}
      </SyntaxHighlighter>
    )
  }
}

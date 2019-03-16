import React, { PureComponent, ReactNode } from 'react'
import { Head } from 'next/document'

import AppBar from 'ui/components/AppBar'

import styles from './styles'

interface PageProps {
  children: ReactNode
}

export default class Page extends PureComponent<PageProps> {
  render () {
    const { children } = this.props
    return (
      <div>
        <Head>
          <title>Reflex</title>
        </Head>
        <AppBar />
        <div css={styles.content}>{children}</div>
      </div>
    )
  }
}

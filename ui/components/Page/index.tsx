import React, { PureComponent, ReactNode } from 'react'
import Head from 'next/head'

import AppBar from 'ui/components/AppBar'

import { PageQuery } from 'gen/documents'
import styles from './styles'

interface PageProps {
  children: ReactNode
  query: PageQuery.Fragment
}

export default class Page extends PureComponent<PageProps> {
  render() {
    const { children, query } = this.props
    console.log('Page', query)
    return (
      <div>
        <Head>
          <title>Reflex</title>
        </Head>
        <AppBar query={query} />
        <div css={styles.content}>{children}</div>
      </div>
    )
  }
}

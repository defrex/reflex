import React, { PureComponent, ReactNode } from 'react'
import Head from 'next/head'

import AppBar from 'ui/components/AppBar'

import { PageQueryFragment } from 'ui/graphqlClient'
import styles from './styles'

interface PageProps {
  children: ReactNode
  query: PageQueryFragment
}

export default class Page extends PureComponent<PageProps> {
  render() {
    const { children, query } = this.props
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

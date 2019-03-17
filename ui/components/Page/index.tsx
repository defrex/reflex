import React, { PureComponent, ReactNode } from 'react'
import Head from 'next/head'

import AppBar from 'ui/components/AppBar'

// import { PageQuery } from './fragments.graphql'
import styles from './styles'

interface PageProps {
  children: ReactNode
  // query: PageQuery
}

export default class Page extends PureComponent<PageProps> {
  render() {
    const { children } = this.props
    // console.log('💢 PageQuery', query)
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

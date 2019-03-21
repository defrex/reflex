import React, { PureComponent, ReactNode } from 'react'
import Head from 'next/head'
import { DocumentNode } from 'graphql'

import AppBar from 'ui/components/AppBar'
import Code from 'ui/components/Code'

import { PageQueryFragment } from 'ui/graphqlClient'
import styles from './styles'

interface PageProps {
  query: PageQueryFragment
  debug?: boolean
  document?: DocumentNode
  children: ReactNode
}

export default class Page extends PureComponent<PageProps> {
  static defaultProps = {
    debug: false,
  }

  render() {
    const { children, query, debug, document } = this.props
    return (
      <div>
        <Head>
          <title>Reflex</title>
        </Head>
        <AppBar query={query} />
        <div css={styles.contentWrapper}>
          <div css={styles.content}>
            {children}
            {debug && document && document.loc ? (
              <Code language='graphql'>{document.loc.source.body}</Code>
            ) : null}
            {debug ? (
              <Code language='json'>{JSON.stringify(query, null, 2)}</Code>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

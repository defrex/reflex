import React, { PureComponent, ReactNode } from 'react'
import Head from 'next/head'
import { DocumentNode } from 'graphql'

import AppBar from 'ui/components/AppBar'
import Code from 'ui/components/Code'

import menuSvg from './icons/menu-light.svg'
import cancelSvg from './icons/cancel-light.svg'
import { PageQueryFragment } from 'ui/lib/graphql'
import styles from './styles'
import MainMenu from '../MainMenu'

interface PageProps {
  query: PageQueryFragment
  debug?: boolean
  document?: DocumentNode
  children: ReactNode
}

interface PageState {
  menuOpen: boolean
}

export default class Page extends PureComponent<PageProps> {
  static defaultProps = {
    debug: false,
  }

  state = {
    menuOpen: false,
  }

  handleMenuClick = () => {
    const { menuOpen } = this.state
    this.setState({
      menuOpen: !menuOpen,
    })
  }

  render() {
    const { children, query, debug, document } = this.props
    const { menuOpen } = this.state
    return (
      <div>
        <Head>
          <title>Reflex</title>
        </Head>
        <AppBar
          query={query}
          menuIcon={menuOpen ? cancelSvg : menuSvg}
          onMenuclick={this.handleMenuClick}
        />
        <MainMenu visible={menuOpen} query={query} />
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

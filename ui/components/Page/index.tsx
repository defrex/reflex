import React, { PureComponent, ReactNode } from 'react'
import { DocumentNode } from 'graphql'

import AppBar from 'ui/components/AppBar'
import Code from 'ui/components/Code'

import { PageQueryFragment } from 'ui/lib/graphql'
import styles from './styles'
import MainMenu from '../MainMenu'

// const cancelSvg = require('./icons/cancel-light.svg')
// const menuSvg = require('./icons/menu-light.svg')

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
        <AppBar
          query={query}
          menuIcon={''}
          onMenuclick={this.handleMenuClick}
        />
        <MainMenu visible={menuOpen} query={query} />
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
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

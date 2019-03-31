import React, { PureComponent, MouseEvent } from 'react'

import Icon from 'ui/components/Icon'
import Link from 'ui/components/Link'

import { AppBarQueryFragment } from 'ui/lib/graphql'
import styles from './styles'

interface AppBarProps {
  query: AppBarQueryFragment
  onMenuclick: () => void
  menuIcon: string
}

export default class AppBar extends PureComponent<AppBarProps> {
  handleMenuClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const { onMenuclick } = this.props
    event.preventDefault()

    onMenuclick()
  }

  render() {
    const { query, menuIcon } = this.props
    return (
      <div className={styles.appBarOuter}>
        <div className={styles.appBarInner}>
          <a href='#' onClick={this.handleMenuClick}>
            <Icon src={menuIcon} alt='menu' />
          </a>
          <Link to='/dashboard'>
            <img
              className={styles.logo}
              src='/static/protologo.svg'
              alt='Reflex'
            />
          </Link>
          <div className={styles.spacer} />
          <div>
            {query.currentUser ? (
              <div>
                <Link to='/profile' className={styles.link}>
                  {query.currentUser.name}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

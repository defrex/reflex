import React, { PureComponent, MouseEvent } from 'react'

import { MainMenuQueryFragment, withMainMenuMutation } from 'ui/lib/graphql'
import styles from './styles'
import GithubAuthButton from 'ui/components/GithubAuthButton'
import Link from 'ui/components/Link'
// import routes from 'ui/routes'

interface MainMenuProps {
  query: MainMenuQueryFragment
  visible: boolean
  logout: Function
}

class MainMenu extends PureComponent<MainMenuProps> {
  static defaultPropd = {
    visible: false,
  }

  handleLogoutClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    const { logout } = this.props
    event.preventDefault()

    console.log('🚪')

    const { data } = await logout()

    console.log('🚪', data)
    if (data.logout.status.success) {
      document.location.href = '/dashboard'
    }
  }

  render() {
    const { query, visible } = this.props
    return (
      <div
        style={{
          display: visible ? 'block' : 'none',
        }}
        css={styles.mainMenu}
      >
        <ul css={styles.list}>
          {query.currentUser ? (
            <>
              <li css={styles.item}>
                <span css={styles.username}>{query.currentUser.name}</span>
                <a
                  href='#'
                  css={styles.lowEmphisis}
                  onClick={this.handleLogoutClick}
                >
                  Logout
                </a>
              </li>
              {query.organizations.map((organization) => (
                <li css={styles.item} key={organization.id}>
                  <Link route={`/organizations/${organization.id}`}>
                    <a>{organization.name}</a>
                  </Link>
                </li>
              ))}
              <li css={styles.item}>
                <Link route='/organization'>
                  <a href='#' css={styles.lowEmphisis}>
                    New Organization
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <li css={styles.item}>
              <GithubAuthButton query={query}>Login</GithubAuthButton>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default withMainMenuMutation<MainMenuProps>({ name: 'logout' })(MainMenu)

import React, { PureComponent, MouseEvent } from 'react'

import { MainMenuQueryFragment, withMainMenuMutation } from 'ui/lib/graphql'
import styles from './styles'
import GithubAuthButton from 'ui/components/GithubAuthButton'
import Link from 'ui/components/Link'

interface MainMenuProps {
  query: MainMenuQueryFragment
  visible: boolean
}

class MainMenu extends PureComponent<MainMenuProps> {
  static defaultPropd = {
    visible: false,
  }

  handleLogoutClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    const { logout } = this.props as any
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
        className={styles.mainMenu}
      >
        <ul className={styles.list}>
          {query.currentUser ? (
            <>
              <li className={styles.item}>
                <span className={styles.username}>
                  {query.currentUser.name}
                </span>
                <a
                  href='#'
                  className={styles.lowEmphisis}
                  onClick={this.handleLogoutClick}
                >
                  Logout
                </a>
              </li>
              {query.teams.map((team) => (
                <li className={styles.item} key={team.id}>
                  <Link to={`/teams/${team.id}/library`}>{team.name}</Link>
                </li>
              ))}
              <li className={styles.item}>
                <Link to='/team' className={styles.lowEmphisis}>
                  New Team
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.item}>
              <GithubAuthButton query={query}>Login</GithubAuthButton>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default withMainMenuMutation<MainMenuProps>({ name: 'logout' })(MainMenu)

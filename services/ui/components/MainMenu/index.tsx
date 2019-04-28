import React, { PureComponent } from 'react'
import GithubAuthButton from 'ui/components/GithubAuthButton'
import Link from 'ui/components/Link'
import { MainMenuQueryFragment } from 'ui/lib/graphql'
import styles from './styles'

interface MainMenuProps {
  query: MainMenuQueryFragment
  visible: boolean
}

export default class MainMenu extends PureComponent<MainMenuProps> {
  static defaultPropd = {
    visible: false,
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
                <a href='/api/logout' className={styles.lowEmphisis}>
                  Logout
                </a>
              </li>
              {query.teams.map((team) => (
                <li className={styles.item} key={team.id}>
                  <Link to={`/teams/${team.id}/library`}>{team.name}</Link>
                </li>
              ))}
              <li className={styles.item}>
                <Link to='/teams' className={styles.lowEmphisis}>
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

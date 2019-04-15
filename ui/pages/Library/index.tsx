import React, { PureComponent } from 'react'
import { match } from 'react-router'
import Link from 'ui/components/Link'
import Page from 'ui/components/Page'
import { LibraryQueryComponent, LibraryQueryDocument } from 'ui/lib/graphql'
import { componentRoute } from 'ui/lib/routes'
import styles from './styles'

interface RouteParams {
  teamId: string
}

interface LibraryProps {
  teamId: string
  match: match<RouteParams>
}

export default class Library extends PureComponent<LibraryProps> {
  render() {
    const { match } = this.props
    return (
      <LibraryQueryComponent variables={{ teamId: match.params.teamId }}>
        {({ data }) =>
          data && data.team ? (
            <Page query={data} document={LibraryQueryDocument}>
              <h1>Library</h1>
              {data.team.components.map((component) => (
                <div className={styles.component} key={component.id}>
                  <Link
                    to={componentRoute({
                      teamId: data.team!.id,
                      componentId: component.id,
                    })}
                  >
                    <div className={styles.componentName}>{component.name}</div>
                  </Link>
                </div>
              ))}
            </Page>
          ) : null
        }
      </LibraryQueryComponent>
    )
  }
}

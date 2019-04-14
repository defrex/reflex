import React, { PureComponent } from 'react'
import { match } from 'react-router'
import Page from 'ui/components/Page'
import UnsafeHmtl from 'ui/components/UnsafeHtml'
import { LibraryQueryComponent, LibraryQueryDocument } from 'ui/lib/graphql'
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
                  <div className={styles.componentName}>{component.name}</div>

                  {component.samples.map((sample) => (
                    <div className={styles.sample} key={sample.id}>
                      <div className={styles.sampleName}>{sample.name}</div>

                      {sample.renders.map((render) => (
                        <div className={styles.render} key={render.id}>
                          <div className={styles.renderName}>
                            {render.branch}/{render.commit.slice(0, 7)}/
                            {render.createdAt}
                          </div>
                          <UnsafeHmtl>{render.html}</UnsafeHmtl>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </Page>
          ) : null
        }
      </LibraryQueryComponent>
    )
  }
}

import React, { PureComponent } from 'react'
import { match } from 'react-router'
import Page from 'ui/components/Page'
import UnsafeHmtl from 'ui/components/UnsafeHtml'
import { ComponentQueryComponent, ComponentQueryDocument } from 'ui/lib/graphql'
import styles from './styles'

interface RouteParams {
  teamId: string
  componentId: string
}

interface ComponentProps {
  match: match<RouteParams>
}

export default class Component extends PureComponent<ComponentProps> {
  render() {
    const { match } = this.props
    const { teamId, componentId } = match.params
    return (
      <ComponentQueryComponent variables={{ teamId, componentId }}>
        {({ data }) =>
          data && data.team && data.team.component ? (
            <Page query={data} document={ComponentQueryDocument}>
              <h1>{data.team.component.name}</h1>
              {data.team.component.samples.map((sample) => (
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
            </Page>
          ) : null
        }
      </ComponentQueryComponent>
    )
  }
}

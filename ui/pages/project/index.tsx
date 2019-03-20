import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import Code from 'ui/components/Code'

import {
  ProjectPageQueryComponent,
  ProjectPageQueryDocument,
} from 'ui/graphqlClient'

interface ProjectPageProps {
  repoOwner: string
  repoName: string
}

export default class ProjectPage extends PureComponent<ProjectPageProps> {
  static getInitialProps({ query }: { query: ProjectPageProps }) {
    return query
  }

  render() {
    const { repoName, repoOwner } = this.props
    return (
      <ProjectPageQueryComponent variables={{ repoName, repoOwner }}>
        {({ data }) =>
          data ? (
            <Page query={data}>
              <h1>Project</h1>
              <Code language='graphql'>
                {ProjectPageQueryDocument.loc.source.body}
              </Code>
              <Code language='json'>{JSON.stringify(data, null, 2)}</Code>
            </Page>
          ) : null
        }
      </ProjectPageQueryComponent>
    )
  }
}

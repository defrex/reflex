import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import Breadcrumbs from 'ui/components/Breadcrumbs'

import {
  ProjectPageQueryComponent,
  ProjectPageQueryDocument,
} from 'ui/lib/graphql'

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
            <Page query={data} document={ProjectPageQueryDocument}>
              <Breadcrumbs>
                {[
                  { name: 'Dashboard', route: '/dashboard' },
                  {
                    name: `${repoOwner}/${repoName}`,
                    route: 'project',
                    params: { repoName, repoOwner },
                  },
                ]}
              </Breadcrumbs>
            </Page>
          ) : null
        }
      </ProjectPageQueryComponent>
    )
  }
}

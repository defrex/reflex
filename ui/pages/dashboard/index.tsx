import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import FigmaAuthButton from 'ui/components/FigmaAuthButton'
import GithubAuthButton from 'ui/components/GithubAuthButton'

import { DashboardQueryComponent, DashboardQueryDocument } from 'ui/lib/graphql'

export default class Dashboard extends PureComponent {
  render() {
    return (
      <DashboardQueryComponent>
        {({ data }) =>
          data ? (
            <Page query={data} document={DashboardQueryDocument}>
              <h1>Dashboard</h1>
              {console.log(data)}
              {!data.currentUser ? (
                <div>
                  <FigmaAuthButton query={data} />
                  <GithubAuthButton query={data} />
                </div>
              ) : null}
            </Page>
          ) : null
        }
      </DashboardQueryComponent>
    )
  }
}

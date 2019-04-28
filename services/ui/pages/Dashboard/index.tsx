import React from 'react'
import Page from 'ui/components/Page'
import { DashboardQueryComponent, DashboardQueryDocument } from 'ui/lib/graphql'

export default function Dashboard() {
  return (
    <DashboardQueryComponent>
      {({ data }) =>
        data ? (
          <Page query={data} document={DashboardQueryDocument}>
            <h1>Dashboard</h1>
          </Page>
        ) : null
      }
    </DashboardQueryComponent>
  )
}

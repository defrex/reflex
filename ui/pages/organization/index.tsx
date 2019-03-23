import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import Code from 'ui/components/Code'

import { OrganizationPageQueryComponent } from 'ui/graphqlClient'
import styles from './styles'

interface OrganizationPageProps {
  organizationId: string
}

export default class OrganizationPage extends PureComponent<
  OrganizationPageProps
> {
  static getInitialProps({ query }: { query: OrganizationPageProps }) {
    return query
  }

  render() {
    const { organizationId } = this.props
    return (
      <OrganizationPageQueryComponent variables={{ organizationId }}>
        {({ data }) => (
          <Page css={styles.root} query={data}>
            <h1>OrganizationPage</h1>
            <Code language='json'>{JSON.stringify(data, null, 2)}</Code>
          </Page>
        )}
      </OrganizationPageQueryComponent>
    )
  }
}

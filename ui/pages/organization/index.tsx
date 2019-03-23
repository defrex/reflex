import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'

import { OrganizationPageQueryComponent } from 'ui/lib/graphql'
import styles from './styles'

interface OrganizationPageProps {
  organizationId: number
}

export default class OrganizationPage extends PureComponent<
  OrganizationPageProps
> {
  static getInitialProps({
    query,
  }: {
    query: { id: string }
  }): OrganizationPageProps {
    return { organizationId: parseInt(query.id) }
  }

  render() {
    const { organizationId } = this.props
    return (
      <OrganizationPageQueryComponent variables={{ organizationId }}>
        {({ data }) =>
          data ? (
            <Page css={styles.root} query={data}>
              <h1>{data.organization!.name}</h1>
            </Page>
          ) : null
        }
      </OrganizationPageQueryComponent>
    )
  }
}

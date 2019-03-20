import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'

import { ProfilePageQueryComponent } from 'ui/graphqlClient'
import Button from 'ui/components/Button'

export default class ProfilePage extends PureComponent {
  render() {
    return (
      <ProfilePageQueryComponent>
        {({ data }) =>
          data && data.currentUser ? (
            <Page query={data}>
              <h1>{data.currentUser.name}</h1>
              <div>
                {data.currentUser.figmaConnected ? (
                  'Figma Connected'
                ) : (
                  <Button href={data.config.figmaAuthUrl}>
                    <img src='/static/figma-logo.svg' />
                    Connect Figma
                  </Button>
                )}
              </div>
            </Page>
          ) : null
        }
      </ProfilePageQueryComponent>
    )
  }
}

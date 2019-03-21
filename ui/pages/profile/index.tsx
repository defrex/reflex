import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import FigmaAuthButton from 'ui/components/FigmaAuthButton'
import GithubAuthButton from 'ui/components/GithubAuthButton'

import {
  ProfilePageQueryComponent,
  ProfilePageQueryDocument,
} from 'ui/graphqlClient'

export default class ProfilePage extends PureComponent {
  render() {
    return (
      <ProfilePageQueryComponent>
        {({ data }) =>
          data && data.currentUser ? (
            <Page query={data} document={ProfilePageQueryDocument}>
              <h1>{data.currentUser.name}</h1>
              <div>
                <div>
                  {data.currentUser.figmaConnected ? (
                    'Figma Connected'
                  ) : (
                    <FigmaAuthButton query={data} />
                  )}
                </div>
                <div>
                  {data.currentUser.githubConnected ? (
                    'Github Connected'
                  ) : (
                    <GithubAuthButton query={data} />
                  )}
                </div>
              </div>
            </Page>
          ) : null
        }
      </ProfilePageQueryComponent>
    )
  }
}

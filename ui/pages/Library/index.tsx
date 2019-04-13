import React, { PureComponent } from 'react'
import Page from 'ui/components/Page'
import { LibraryQueryComponent, LibraryQueryDocument } from 'ui/lib/graphql'

export default class Library extends PureComponent {
  render() {
    return (
      <LibraryQueryComponent>
        {({ data }) =>
          data ? (
            <Page query={data} document={LibraryQueryDocument}>
              <h1>Library</h1>
            </Page>
          ) : null
        }
      </LibraryQueryComponent>
    )
  }
}

import React, { PureComponent } from 'react'

import Page from 'ui/components/Page'
import * as ButtonExamples from 'ui/components/Button/examples'
import * as CodeExamples from 'ui/components/Code/examples'

import { LibraryQueryComponent, LibraryQueryDocument } from 'ui/lib/graphql'
import styles from './styles'

export default class Library extends PureComponent {
  render() {
    return (
      <LibraryQueryComponent>
        {({ data }) =>
          data ? (
            <Page query={data} document={LibraryQueryDocument}>
              <h1>Library</h1>

              <div css={styles.libraryItem}>
                <div css={styles.libraryItemTitle}>Button</div>
                {Object.entries(ButtonExamples).map(
                  ([name, ButtonExample], index) => (
                    <div key={index} css={styles.libraryInstance}>
                      <div css={styles.libraryInstanceTitle}>{name}</div>
                      <ButtonExample />
                    </div>
                  ),
                )}
              </div>

              <div css={styles.libraryItem}>
                <div css={styles.libraryItemTitle}>Code</div>
                {Object.entries(CodeExamples).map(
                  ([name, CodeExample], index) => (
                    <div key={index} css={styles.libraryInstance}>
                      <div css={styles.libraryInstanceTitle}>{name}</div>
                      <CodeExample />
                    </div>
                  ),
                )}
              </div>
            </Page>
          ) : null
        }
      </LibraryQueryComponent>
    )
  }
}

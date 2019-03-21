import React, { PureComponent } from 'react'
import { DocumentNode } from 'graphql'

import Code from 'ui/components/Code'

interface DebugQueryProps {
  document: DocumentNode
  data: object
}

export default class DebugQuery extends PureComponent<DebugQueryProps> {
  render() {
    const { document, data } = this.props
    return (
      <div>
        {document.loc ? (
          <Code language='graphql'>{document.loc.source.body}</Code>
        ) : (
          'Cannot find document'
        )}
        <Code language='json'>{JSON.stringify(data, null, 2)}</Code>
      </div>
    )
  }
}

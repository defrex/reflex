import React from 'react'
import { sampleSets } from '../../../SampleSet'
import { SampleSet } from '../SampleSet'

export function Document() {
  return (
    <html>
      <body>
        <h1>Hello UI</h1>
        {sampleSets.map((sampleSet) => (
          <SampleSet sampleSet={sampleSet} key={sampleSet.componentName} />
        ))}
      </body>
    </html>
  )
}

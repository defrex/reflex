import React from 'react'
import { SampleSet as SampleSetData } from '../../../SampleSet'

interface SampleSetProps {
  sampleSet: SampleSetData
}
export function SampleSet(props: SampleSetProps) {
  const { sampleSet } = props
  return (
    <div>
      <h3>{sampleSet.componentName}</h3>
      {sampleSet.samples.map((sample) => (
        <div key={sample.name}>
          <h4>{sample.name}</h4>
          <div dangerouslySetInnerHTML={{ __html: sample.document || '' }} />
        </div>
      ))}
    </div>
  )
}

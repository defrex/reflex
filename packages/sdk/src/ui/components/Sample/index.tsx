import React from 'react'
import { Sample as SampleData } from '../../../Sample'

interface SampleProps {
  sample: SampleData
}
export function Sample(props: SampleProps) {
  const { sample } = props
  return (
    <div>
      <h4>{sample.name}</h4>
      <div dangerouslySetInnerHTML={{ __html: sample.document || '' }} />
    </div>
  )
}

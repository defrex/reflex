import React from 'react'
import { Component as ComponentModel } from 'src/Component'

interface ComponentProps {
  component: ComponentModel
}
export function Component(props: ComponentProps) {
  const { component } = props
  return (
    <div>
      <h3>{component.name}</h3>
      {component.samples.map((sample) => (
        <div key={sample.name}>
          <h4>{sample.name}</h4>
          <div dangerouslySetInnerHTML={{ __html: sample.document || '' }} />
        </div>
      ))}
    </div>
  )
}

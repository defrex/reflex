import React from 'react'
import { componentSet } from 'src/componentSet'
import { Component } from 'src/server/ui/components/Component'

export function App() {
  return (
    <div>
      <h1>Hello UI</h1>
      {componentSet.map((component) => (
        <Component component={component} key={component.name} />
      ))}
    </div>
  )
}

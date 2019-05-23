import { Component } from 'src/Component'

class ComponentSet {
  private components: Component[] = []

  get length() {
    return this.components.length
  }

  add(component: Component) {
    this.components.push(component)
  }

  find(name: string) {
    for (const component of this.components) {
      if (component.name === name) {
        return component
      }
    }
  }

  map(func: (component: Component, index?: number) => any) {
    return this.components.map(func)
  }

  sampleCount() {
    return this.components.reduce((sum, component) => sum + component.length, 0)
  }

  async render() {
    for (const component of this.components) {
      await component.render()
    }
  }
}

export const componentSet = new ComponentSet()

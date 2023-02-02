import React from 'react'

export function withContext<T>(component: React.FC<T>, contextProvider: any): React.FC<T> {
  return function contextComponent(props) {
    return React.createElement(contextProvider, {
      ...props,
      // @ts-ignore
      children: React.createElement(component, props)
    })
  }
}

import { CommonActions, StackActions } from '@react-navigation/native'
import React from 'react'

export const navigationRef: any = React.createRef()

export const nav = new (class {
  // Use this when you wish to navigate to another page
  navigate<T extends object>(name: string, params?: T, screen?: string): void {
    console.info(`[NAV] navigate: ${name}`, params)
    if (screen) {
      navigationRef.current.navigate(name, { screen, params })
    } else {
      navigationRef.current.navigate(name, params)
    }
  }

  navigateAndPop<T extends object>(name: string, params?: T, screen?: string): void {
    console.info(`[NAV] navigateAndPop: ${name}`, params)
    this.pop(1)
    this.navigate(name, params, screen)
  }

  // Use this when you wish to navigate to another page and pop the entire stack
  reset<T extends object>(name: string, params?: T, screen?: string): void {
    console.info('[NAV] reset:', name)
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name, params: { ...params, screen } }]
      })
    )
  }

  // Use this when you wish to force navigate to another page, even when the page already exists in the stack
  push<T extends object>(name: string, params?: T): void {
    console.info('[NAV] push:', name)
    navigationRef.current.dispatch(StackActions.push(name, params))
  }

  pop(count?: number): void {
    console.info('[NAV] pop:', count)
    navigationRef.current.dispatch(StackActions.pop(count))
  }

  // Use this to return to the previous page
  goBack(): void {
    console.info('[NAV] goBack')
    navigationRef.current.goBack()
  }
})()

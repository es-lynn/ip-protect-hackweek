import { useEffect } from 'react'

export const useAsyncEffect = (effect: () => Promise<void>, deps: any[]) => {
  useEffect(() => {
    ;(async () => {
      await effect()
    })()
  }, deps)
}

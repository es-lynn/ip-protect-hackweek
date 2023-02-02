import { Dispatch, SetStateAction, useState } from 'react'

export function useFormState<T>(
  initialValue: T
): [T, (k: keyof T, v: T[keyof T]) => void, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue)
  const mySetValue = (k: keyof T, v: T[keyof T]) => {
    setValue(prev => ({ ...prev, [k]: v }))
  }
  return [value, mySetValue, setValue]
}

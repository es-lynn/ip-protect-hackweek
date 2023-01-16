import { ReactElement } from 'react'

export type ModalControllerProps = {
  visibility: boolean
  close: () => void
  children: ReactElement
}

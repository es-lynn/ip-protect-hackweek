import { AlertDialog, Button } from 'native-base'
import React, { ReactElement } from 'react'

/**
 * ModalController is simply an interface controller customized to your own needs
 */
class ModalController {
  modal: any = undefined as any

  setModal(modal: any) {
    this.modal = modal
  }

  protected render<T = undefined>(
    reactContainer: (p: {
      visibility: boolean
      close: () => void
      children: ReactElement
    }) => ReactElement,
    element:
      | ReactElement
      | ((p: {
          modal: { ok: (result: any) => void; cancel: () => void }
        }) => ReactElement)
  ): Promise<T> {
    if (this.modal == null) {
      throw new Error(
        'Modal not initialized. Please render <ModalProvider> in the top level component and call setModal(ref)'
      )
    }
    // const id = Faker.datatype.uuid()
    const id = new Date().getTime()
    return this.modal.render(reactContainer, element, id)
  }

  /**
   * @deprecated - Not deprecated, actually experimental
   * @experimental
   * Not finalized yet, be careful of using
   */
  closeAll() {
    this.modal.closeAll()
  }
}

export class MyModalController extends ModalController {
  dialog<T>(
    element:
      | ReactElement
      | ((p: {
          modal: { ok: (result: T) => void; cancel: () => void }
        }) => ReactElement)
  ): Promise<T> {
    return this.render(p => {
      const cancelRef = {} as any
      return (
        <AlertDialog
          key={new Date().getTime()}
          leastDestructiveRef={cancelRef}
          isOpen={p.visibility}
          onClose={p.close}
        >
          {p.children}
        </AlertDialog>
      )
    }, element)
  }
  drawer<T>(
    element:
      | ReactElement
      | ((p: {
          modal: { ok: (result: T) => void; cancel: () => void }
        }) => ReactElement)
  ): Promise<T> {
    return this.render(
      // p => <DrawerLayout {...p}>{p.children}</DrawerLayout>,
      p => <></>,
      element
    )
  }
}

export const Modal = new MyModalController()

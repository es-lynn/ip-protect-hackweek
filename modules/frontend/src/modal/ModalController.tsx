import { AlertDialog, Modal as NativeBaseModal } from 'native-base'
import React, { ReactElement } from 'react'

import { ConfirmDialog } from './layouts/ConfirmDialog'

/**
 * ModalController is simply an interface controller customized to your own needs
 */
class ModalController {
  modal: any = undefined as any

  setModal(modal: any): void {
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
      | ((p: { modal: { ok: (result: any) => void; cancel: () => void } }) => ReactElement)
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
  confirm<T>(
    element:
      | ReactElement
      | ((p: { modal: { ok: (result: T) => void; cancel: () => void } }) => ReactElement)
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
  confirm2<T>(options: {
    title: string
    body: string
    confirmText?: string
    onConfirm: () => Promise<any> | any
    onCancel?: () => any
    type: 'info' | 'success' | 'warning' | 'danger'
  }): Promise<T> {
    return this.render(modalController => {
      return (
        <ConfirmDialog
          title={options.title}
          body={options.body}
          onConfirm={options.onConfirm}
          onCancel={options.onCancel}
          type={options.type}
          modalController={modalController}
          // TODO: Remove default text and always require confirmText
          confirmText={options.confirmText ?? 'Delete'}
        />
      )
    }, <></>)
  }
  dialog<T>(
    element:
      | ReactElement
      | ((p: { modal: { ok: (result: T) => void; cancel: () => void } }) => ReactElement)
  ): Promise<T> {
    return this.render(p => {
      return (
        <NativeBaseModal
          avoidKeyboard={false}
          closeOnOverlayClick={false}
          key={new Date().getTime()}
          isOpen={p.visibility}
          onClose={p.close}
        >
          {p.children}
        </NativeBaseModal>
      )
    }, element)
  }
  drawer<T>(
    element:
      | ReactElement
      | ((p: { modal: { ok: (result: T) => void; cancel: () => void } }) => ReactElement)
  ): Promise<T> {
    return this.render(
      // p => <DrawerLayout {...p}>{p.children}</DrawerLayout>,
      p => <></>,
      element
    )
  }
}

export const Modal = new MyModalController()

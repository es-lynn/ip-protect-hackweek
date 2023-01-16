import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useState
} from 'react'

import { obj } from '../utils/object.util'

/**
 * ModalProvider renders the component itself
 * It also handles the toggling of visible / non visible
 * Also handles promise data
 */
type ModalInfo = Record<
  string,
  {
    visibility: boolean
    reactElement: ReactElement
    reactContainer: (p: {
      visibility: boolean
      close: () => void
      children: ReactElement
    }) => ReactElement
    res: Function
    rej: Function
  }
>

export const ModalProvider = forwardRef((props: {}, ref) => {
  const [modalInfoList, setModalInfoList] = useState<ModalInfo>({})

  function close(uuid: string) {
    setModalInfoList(prev => {
      if (prev[uuid]) {
        prev[uuid].rej()
        prev[uuid].visibility = false
      } else {
        console.warn('Modal close() called twice')
      }
      return { ...prev }
    })

    // setTimeout(() => {
    setModalInfoList(prev => obj.omit(prev, uuid))
    // }, 250);
  }

  useImperativeHandle(ref, () => ({
    async closeAll(): Promise<void> {
      Object.keys(modalInfoList).forEach(uuid => close(uuid))
    },
    async render<T>(
      modalContainer: (p: {
        visibility: boolean
        close: () => void
      }) => ReactElement,
      modalChild:
        | ReactElement
        | ((p: {
            modal: { ok: (result: any) => void; cancel: () => void }
          }) => ReactElement),
      uuid: string,
      modalProps: any,
      reject = false
    ): Promise<T> {
      return new Promise((res, rej) => {
        function ok(result: T | undefined) {
          setModalInfoList(prev => {
            prev[uuid].visibility = false
            return { ...prev }
          })
          // @ts-ignore
          res(result)
          // setTimeout(() => {
          setModalInfoList(prev => obj.omit(prev, uuid))
          // }, 500);
        }

        function cancel() {
          close(uuid)
        }

        const modalChildElement = (() => {
          if (typeof modalChild === 'function') {
            return modalChild({ modal: { ok, cancel } })
          }
          return modalChild
        })()

        const modalInfo = {
          [uuid]: {
            reactContainer: modalContainer,
            reactElement: modalChildElement,
            visibility: true,
            res,
            rej
          }
        }
        setModalInfoList(prev => ({ ...modalInfo, ...prev }))
        // setModalInfoList(prev => {
        //   console.log(prev)
        //   return { ...modalInfo, ...prev }
        // })
      })
    }
  }))

  return (
    <>
      {Object.keys(modalInfoList)
        .reverse()
        .map(uuid => {
          return modalInfoList[uuid].reactContainer({
            close: () => close(uuid),
            visibility: modalInfoList[uuid].visibility,
            children: modalInfoList[uuid].reactElement
          })
        })}
    </>
  )
})

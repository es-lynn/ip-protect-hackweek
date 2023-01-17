import { Toast as ToastNativeBase } from 'native-base'

function success(message: string): void {
  ToastNativeBase.show({
    title: message
  })
}

function error(message: string): void {
  ToastNativeBase.show({
    title: message
  })
}

function warn(message: string): void {
  ToastNativeBase.show({
    title: message
  })
}

function info(message: string): void {
  ToastNativeBase.show({
    title: message
  })
}

export function throwToastError(e: Error): never {
  ToastNativeBase.show({
    title: `${e.name}: ${e.message}`
  })
  throw e
}

export const Toast = {
  success,
  error,
  warn,
  info
}

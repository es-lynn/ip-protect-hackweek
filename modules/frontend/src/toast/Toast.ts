import { Toast as ToastNativeBase } from 'native-base'

function success(message: string): void {
  ToastNativeBase.show({
    title: message
  })
}

function error(message: string): void {
  ToastNativeBase.show({
    title: message,
    style: { backgroundColor: 'red' }
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

export function throwToastAPIError(e: Error): never {
  const error = e['error'] ?? e
  ToastNativeBase.show({
    title: `${error.name}: ${error.message}`,
    style: { backgroundColor: '#ff3333' },
    placement: 'bottom'
  })
  throw error
}

export function throwToastError(e: Error): never {
  ToastNativeBase.show({
    title: `${e.name}: ${e.message}`,
    style: { backgroundColor: '#ff3333' },
    placement: 'bottom'
  })
  throw e
}

export const Toast = {
  success,
  error,
  warn,
  info
}

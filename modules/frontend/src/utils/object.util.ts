function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  omitKeys: K | K[]
): Omit<T, K> {
  const newObject = Object.assign({}, object)
  if (omitKeys instanceof Array) {
    omitKeys.forEach(key => {
      delete newObject[key]
    })
  } else {
    delete newObject[omitKeys]
  }
  return newObject
}

function pick<T extends Record<string, any>, K extends keyof T>(
  object: T,
  pickKeys: K | K[]
): Pick<T, K> {
  const newObject = {}
  if (pickKeys instanceof Array) {
    pickKeys.forEach(key => {
      // @ts-ignore
      newObject[key] = object[key]
    })
  } else {
    // @ts-ignore
    newObject[pickKeys] = object[pickKeys]
  }
  // @ts-ignore
  return newObject
}

export const obj = { pick, omit }

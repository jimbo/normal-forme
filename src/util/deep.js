export const split = path => /(\[\d+\])|\./[Symbol.split](path).filter(Boolean)

export const join = (...parts) =>
  parts.reduce((path, part) => {
    const prefix = path && part ? "." : ""
    return `${path}${prefix}${part}`
  }, "")

export const setMapOrValue = (valueMap = new Map(), keys, nextValue) => {
  const [key, ...nextKeys] = keys
  const nextValueMap = new Map(valueMap)
  const isLast = !nextKeys.length

  return nextValueMap.set(
    key,
    isLast
      ? nextValue
      : setMapOrValue(nextValueMap.get(key), nextKeys, nextValue)
  )
}

export const setDeepValue = (valueMap, path, nextValue) =>
  setMapOrValue(valueMap, split(path), nextValue)

export const getDeepValue = (valueMap, path) => {
  let value = valueMap

  for (const key of split(path)) {
    if (!(value instanceof Map)) return
    value = value.get(key)
  }

  return value
}

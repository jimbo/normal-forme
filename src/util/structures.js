export const createMap = (object = {}, mapFn) => {
  const iterable = object[Symbol.iterator] ? object : Object.entries(object)
  const map = new Map()
  let index = 0

  for (const entry of iterable) {
    map.set(...(mapFn ? mapFn(entry, index) : entry))
    index++
  }

  return map
}

export const createSet = (iterable = "", mapFn) => {
  const set = new Set()
  let index = 0

  for (const element of iterable) {
    set.add(mapFn ? mapFn(element, index) : element)
    index++
  }

  return set
}

export const createDeepMap = value => {
  try {
    const type = Reflect.getPrototypeOf(value).constructor

    return type === Object
      ? createMap(value, mapEntry)
      : type === Array
      ? createSet(value, mapElement)
      : value
  } catch (error) {
    return value
  }
}

const mapEntry = ([key, value]) => [key, createDeepMap(value)]
const mapElement = value => createDeepMap(value)

export default (iterable = "", mapFn) => {
  const set = new Set()
  let index = 0

  for (const element of iterable) {
    set.add(mapFn ? mapFn(element, index) : element)
    index++
  }

  return set
}

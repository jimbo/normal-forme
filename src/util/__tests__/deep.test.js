import { getDeepValue, setDeepValue, setMapOrValue, split } from "../deep"

describe("split", () => {
  it("returns an array", () => {
    const parts = split("")

    expect(parts).toBeInstanceOf(Array)
    expect(parts).toHaveLength(0)
  })

  it("isolates dot-delimited properties", () => {
    const objectPath = "a.b.c"
    const parts = split(objectPath)

    expect(parts).toHaveLength(3)
    expect(parts).toEqual(["a", "b", "c"])
  })

  it("isolates bracketed indices", () => {
    const arrayPath = "a[0][1]"
    const parts = split(arrayPath)

    expect(parts).toHaveLength(3)
    expect(parts).toEqual(["a", "[0]", "[1]"])
  })

  it("doesn't isolate bracketed properties", () => {
    const objectPath = "a['b'].c"
    const parts = split(objectPath)

    expect(parts).toHaveLength(2)
    expect(parts).toEqual(["a['b']", "c"])
  })

  it("captures brackets, but discards dots", () => {
    const mixedPath = "a.b[0].c"
    const parts = split(mixedPath)

    expect(parts).toHaveLength(4)
    expect(parts).toEqual(["a", "b", "[0]", "c"])
  })

  it("treats bare digits as properties, not indices", () => {
    const objectPath = "a.0.b"
    const parts = split(objectPath)

    expect(parts).toHaveLength(3)
    expect(parts).toEqual(["a", "0", "b"])
  })
})

describe("setMapOrValue", () => {
  it("returns a new map", () => {
    const valueMap = new Map()
    const keys = ["a"]
    const nextValue = "red"

    const result = setMapOrValue(valueMap, keys, nextValue)

    expect(result).toBeInstanceOf(Map)
    expect(result).not.toBe(valueMap)
  })

  it("sets `nextValue` to the last key", () => {
    const valueMap = new Map()
    const keys = ["a"]
    const nextValue = "red"

    const result = setMapOrValue(valueMap, keys, nextValue)
    const expected = new Map().set("a", nextValue)

    expect(result).toEqual(expected)
  })

  it("sets each key to a new map", () => {
    const valueMap = new Map()
    const keys = ["a", "b"]
    const nextValue = "red"

    const result = setMapOrValue(valueMap, keys, nextValue)
    const expected = new Map().set("a", new Map().set("b", nextValue))

    expect(result).toEqual(expected)
  })

  it("retains entries from existing maps", () => {
    const valueMap = new Map().set("a", new Map().set("b", "blue"))
    const keys = ["a", "c"]
    const nextValue = "red"

    const result = setMapOrValue(valueMap, keys, nextValue)
    const expected = new Map().set(
      "a",
      new Map().set("b", "blue").set("c", nextValue)
    )

    expect(result).toEqual(expected)
    expect(result.get("a")).not.toBe(expected.get("a"))
  })
})

describe("setDeepValue", () => {
  it("returns a new map", () => {
    const valueMap = new Map()
    const path = "a.b"
    const nextValue = "red"

    const result = setDeepValue(valueMap, path, nextValue)
    const expected = new Map().set("a", new Map().set("b", nextValue))

    expect(result).toEqual(expected)
    expect(result).not.toBe(valueMap)
  })
})

describe("getDeepValue", () => {
  it("returns the value of the last key in `path`", () => {
    const valueMap = new Map().set("a", new Map().set("b", "blue"))
    const path = "a.b"

    expect(getDeepValue(valueMap, path)).toBe("blue")
  })

  it("returns `undefined` if no value is found", () => {
    const valueMap = new Map()
    const path = "a.b"

    expect(getDeepValue(valueMap, path)).toBeUndefined()
  })
})

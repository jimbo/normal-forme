import { createMap, createSet } from "../structures"

const elements = ["a", "b"]
const elementsIterable = {
  *[Symbol.iterator]() {
    yield* elements
  },
}

const entries = { a: "b", c: "d" }
const entriesIterable = {
  *[Symbol.iterator]() {
    yield* [["a", "b"], ["c", "d"]]
  },
}

describe("createMap", () => {
  it("returns a new map", () => {
    const result = createMap()

    expect(result).toBeInstanceOf(Map)
    expect(result.size).toBe(0)
  })

  it("accepts an object", () => {
    const result = createMap(entries)

    expect(result.size).toBe(2)
    expect(result).toEqual(new Map().set("a", "b").set("c", "d"))
  })

  it("accepts an iterable", () => {
    const result = createMap(entriesIterable)

    expect(result.size).toBe(2)
    expect(result).toEqual(new Map().set("a", "b").set("c", "d"))
  })

  it("applies `mapFn` to each element", () => {
    const mapFn = ([key, value], index) => [
      `${index}-${key}`,
      `${value.toUpperCase()}`,
    ]
    const result = createMap(entriesIterable, mapFn)

    expect(result).toEqual(new Map().set("0-a", "B").set("1-c", "D"))
  })
})

describe("createSet", () => {
  it("returns a new set", () => {
    const result = createSet()

    expect(result).toBeInstanceOf(Set)
  })

  it("accepts any iterable", () => {
    const result = createSet(elementsIterable)

    expect(result).toBeInstanceOf(Set)
    expect(result.size).toBe(2)
    expect([...result]).toEqual(elements)
  })

  it("applies `mapFn` to each element", () => {
    const mapFn = (value, index) => `${value}-${index}`
    const result = createSet(elements, mapFn)

    expect(result).toBeInstanceOf(Set)
    expect(result.size).toBe(2)
    expect([...result]).toEqual(["a-0", "b-1"])
  })
})

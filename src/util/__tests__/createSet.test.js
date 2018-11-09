import createSet from "../createSet"

const elements = ["a", "b"]
const customIterable = {
  *[Symbol.iterator]() {
    yield* elements
  },
}

describe("createSet", () => {
  it("returns a new set", () => {
    const result = createSet()

    expect(result).toBeInstanceOf(Set)
  })

  it("accepts any iterable", () => {
    const result = createSet(customIterable)

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
